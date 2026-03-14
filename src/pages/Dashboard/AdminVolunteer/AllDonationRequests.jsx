import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';
import toast from 'react-hot-toast';
import { FiActivity, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import { FaDroplet } from 'react-icons/fa6';

const AllDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const [role, roleLoading] = useRole(); // Added roleLoading

    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['admin-all-requests'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-donation-requests');
            return data;
        }
    });

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await axiosSecure.patch(`/donation-requests/status/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                toast.success(`Request marked as ${newStatus}`);
                refetch();
            }
        } catch (error) {
            toast.error("Status update failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Permanently delete this request?")) {
            try {
                const res = await axiosSecure.delete(`/donation-requests/${id}`);
                if (res.data.deletedCount > 0) {
                    toast.success("Request removed");
                    refetch();
                }
            } catch (error) {
                toast.error("Delete failed");
            }
        }
    };

    // Wait for BOTH data and role to be ready
    if (isLoading || roleLoading) {
        return (
            <div className="min-h-[400px] flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="bg-base-100 rounded-[2.5rem] shadow-xl p-6 md:p-10 mt-8 border border-base-200" data-aos="fade-up">
            <div className="mb-10">
                <h2 className="text-3xl font-black text-neutral flex items-center gap-3">
                    <FiActivity className="text-primary" /> Global Donation Requests
                </h2>
                <p className="text-base-content/60">Monitor and manage all blood requests across the network.</p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-base-200">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200 h-16 text-neutral font-bold">
                        <tr>
                            <th>Recipient & Location</th>
                            <th>Blood Group</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th className="text-center">Manage Status</th>
                            {role === 'admin' && <th className="text-center">Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 opacity-50">No donation requests found.</td>
                            </tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req._id} className="hover:bg-base-200/50 transition-colors text-center md:text-left">
                                    <td>
                                        <div className="font-bold text-neutral">{req.recipientName}</div>
                                        <div className="text-xs opacity-60">{req.recipientUpazila}, {req.recipientDistrict}</div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2 justify-center md:justify-start">
                                            <FaDroplet className="text-error" />
                                            <span className="font-black text-lg">{req.bloodGroup}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-sm font-medium">{req.donationDate}</div>
                                        <div className="text-xs opacity-50">{req.donationTime}</div>
                                    </td>
                                    <td>
                                        <span className={`badge border-none font-bold text-[10px] uppercase px-3 py-3 ${
                                            req.status === 'pending' ? 'bg-warning/10 text-warning' : 
                                            req.status === 'inprogress' ? 'bg-info/10 text-info' : 
                                            req.status === 'done' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="dropdown dropdown-left dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-sm btn-ghost btn-circle">
                                                <FiMoreVertical size={18} />
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-2xl w-40 border border-base-200">
                                                <li><button onClick={() => handleStatusUpdate(req._id, 'pending')}>Pending</button></li>
                                                <li><button onClick={() => handleStatusUpdate(req._id, 'inprogress')}>In Progress</button></li>
                                                <li><button onClick={() => handleStatusUpdate(req._id, 'done')} className="text-success font-bold">Done</button></li>
                                                <li><button onClick={() => handleStatusUpdate(req._id, 'canceled')} className="text-error font-bold">Cancel</button></li>
                                            </ul>
                                        </div>
                                    </td>
                                    {role === 'admin' && (
                                        <td className="text-center">
                                            <button onClick={() => handleDelete(req._id)} className="btn btn-sm btn-circle btn-ghost text-error">
                                                <FiTrash2 size={18} />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDonationRequests;