import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import { FiTrash2, FiEdit, FiEye } from 'react-icons/fi';
import { FaDroplet } from 'react-icons/fa6';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyDonationRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['my-donation-requests', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/donation-requests/requester/${user?.email}`);
            return data;
        }
    });

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this donation request?");
        if (confirmDelete) {
            try {
                const res = await axiosSecure.delete(`/donation-requests/${id}`);
                if (res.data.deletedCount > 0) {
                    toast.success("Request deleted successfully!");
                    refetch(); // Instantly update the UI
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to delete the request.");
            }
        }
    };

    if (isLoading) {
        return <div className="flex justify-center mt-20"><span className="loading loading-spinner text-primary loading-lg"></span></div>;
    }

    return (
        <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden mt-8 p-6 md:p-8" data-aos="fade-up">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b pb-4">
                <div>
                    <h2 className="text-3xl font-bold text-neutral flex items-center gap-2">
                        <FaDroplet className="text-primary" /> My Donation Requests
                    </h2>
                    <p className="text-base-content/70 mt-1">Manage all the blood donation requests you have created.</p>
                </div>
                <Link to="/dashboard/create-donation-request" className="btn btn-primary text-white rounded-full">
                    Create New Request
                </Link>
            </div>

            {requests.length === 0 ? (
                <div className="text-center py-16 bg-base-200 rounded-2xl">
                    <FaDroplet className="text-6xl text-base-content/20 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-neutral mb-2">No Requests Found</h3>
                    <p className="text-base-content/70 mb-6">You haven't created any blood donation requests yet.</p>
                    <Link to="/dashboard/create-donation-request" className="btn btn-primary text-white rounded-full">
                        Create Your First Request
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-base-200 text-neutral">
                            <tr>
                                <th>Recipient Name</th>
                                <th>Location</th>
                                <th>Blood Group</th>
                                <th>Date & Time</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req._id} className="hover">
                                    <td className="font-semibold">{req.recipientName}</td>
                                    <td>
                                        {req.recipientUpazila}, {req.recipientDistrict}
                                    </td>
                                    <td>
                                        <span className="badge badge-error text-white font-bold">{req.bloodGroup}</span>
                                    </td>
                                    <td>
                                        <div className="text-sm">{req.donationDate}</div>
                                        <div className="text-xs text-base-content/60">{req.donationTime}</div>
                                    </td>
                                    <td>
                                        <span className={`badge capitalize ${
                                            req.status === 'pending' ? 'badge-warning' : 
                                            req.status === 'inprogress' ? 'badge-info' : 
                                            req.status === 'done' ? 'badge-success' : 'badge-ghost'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            {/* We will build these View/Edit routes later */}
                                            <button className="btn btn-sm btn-circle btn-ghost text-info" title="View Details">
                                                <FiEye size={18} />
                                            </button>
                                            <Link 
                                                to={`/dashboard/update-donation-request/${req._id}`} 
                                                className="btn btn-sm btn-circle btn-ghost text-success" 
                                                title="Edit Request"
                                            >
                                                <FiEdit size={18} />
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(req._id)} 
                                                className="btn btn-sm btn-circle btn-ghost text-error" 
                                                title="Delete Request"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyDonationRequests;