import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiActivity, FiEdit, FiTrash2, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';

const AllBloodDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const [role] = useRole(); // We'll use this to conditionally render the delete button (Admin only)

    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['all-donation-requests'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/donation-requests');
            return data;
        }
    });

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axiosSecure.patch(`/donation-requests/status/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                toast.success(`Request marked as ${newStatus}!`);
                refetch();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status.");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this request permanently?");
        if (confirmDelete) {
            try {
                const res = await axiosSecure.delete(`/donation-requests/${id}`);
                if (res.data.deletedCount > 0) {
                    toast.success("Request deleted successfully!");
                    refetch();
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to delete request.");
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
                        <FiActivity className="text-primary" /> All Donation Requests
                    </h2>
                    <p className="text-base-content/70 mt-1">Manage global blood donation requests.</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-base-200 text-neutral">
                        <tr>
                            <th>Recipient</th>
                            <th>Location</th>
                            <th>Blood Group</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th className="text-center">Manage Status</th>
                            {role === 'admin' && <th className="text-center">Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id} className="hover">
                                <td className="font-semibold">{req.recipientName}</td>
                                <td>{req.recipientUpazila}, {req.recipientDistrict}</td>
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
                                        req.status === 'done' ? 'badge-success' : 
                                        req.status === 'canceled' ? 'badge-error' : 'badge-ghost'
                                    } text-white`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex justify-center gap-2">
                                        {/* Status Update Dropdown */}
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-sm btn-outline btn-primary">
                                                <FiEdit /> Update
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 mt-1">
                                                <li><button onClick={() => handleStatusChange(req._id, 'pending')} disabled={req.status === 'pending'}>Pending</button></li>
                                                <li><button onClick={() => handleStatusChange(req._id, 'inprogress')} disabled={req.status === 'inprogress'}>In Progress</button></li>
                                                <li><button onClick={() => handleStatusChange(req._id, 'done')} disabled={req.status === 'done'} className="text-success"><FiCheckCircle /> Done</button></li>
                                                <li><button onClick={() => handleStatusChange(req._id, 'canceled')} disabled={req.status === 'canceled'} className="text-error"><FiXCircle /> Cancel</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                                {/* Admins get a strict delete button for moderation */}
                                {role === 'admin' && (
                                    <td className="text-center">
                                        <button 
                                            onClick={() => handleDelete(req._id)}
                                            className="btn btn-sm btn-circle btn-ghost text-error"
                                            title="Delete Permanently"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBloodDonationRequests;