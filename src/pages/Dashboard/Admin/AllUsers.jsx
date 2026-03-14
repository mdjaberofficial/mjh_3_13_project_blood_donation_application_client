import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { FiUserCheck, FiUserX, FiShield, FiUser } from 'react-icons/fi';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-users');
            return data;
        }
    });

    const handleUpdateRole = async (id, newRole) => {
        try {
            const res = await axiosSecure.patch(`/users/update-role/${id}`, { role: newRole });
            if (res.data.modifiedCount > 0) {
                toast.success(`User role updated to ${newRole}`);
                refetch();
            }
        } catch (error) {
            toast.error("Failed to update role");
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const res = await axiosSecure.patch(`/users/update-status/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                toast.success(`User is now ${newStatus}`);
                refetch();
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    if (isLoading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="bg-base-100 rounded-3xl shadow-xl p-6 md:p-10 mt-8" data-aos="fade-up">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-neutral">User Management</h2>
                <p className="text-base-content/60">Manage roles and access for all members.</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-base-200">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200 text-neutral font-bold h-14">
                        <tr>
                            <th>User Info</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="text-center">Manage Role</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-base-200/50 transition-colors">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.avatar} alt={user.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-xs opacity-50">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge border-none font-bold text-xs uppercase px-3 py-3 ${
                                        user.role === 'admin' ? 'bg-error/10 text-error' : 
                                        user.role === 'volunteer' ? 'bg-primary/10 text-primary' : 'bg-success/10 text-success'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge badge-ghost font-medium text-xs ${user.status === 'blocked' ? 'text-error' : 'text-success'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleUpdateRole(user._id, 'admin')} className="btn btn-xs btn-outline btn-error" disabled={user.role === 'admin'} title="Make Admin"><FiShield /></button>
                                        <button onClick={() => handleUpdateRole(user._id, 'volunteer')} className="btn btn-xs btn-outline btn-primary" disabled={user.role === 'volunteer'} title="Make Volunteer"><FiUser /></button>
                                        <button onClick={() => handleUpdateRole(user._id, 'donor')} className="btn btn-xs btn-outline btn-success" disabled={user.role === 'donor'} title="Make Donor"><FiUserCheck /></button>
                                    </div>
                                </td>
                                <td className="text-center">
                                    {user.status === 'active' ? (
                                        <button onClick={() => handleUpdateStatus(user._id, 'blocked')} className="btn btn-sm btn-ghost text-error" title="Block User">
                                            <FiUserX size={18} /> Block
                                        </button>
                                    ) : (
                                        <button onClick={() => handleUpdateStatus(user._id, 'active')} className="btn btn-sm btn-ghost text-success" title="Unblock User">
                                            <FiUserCheck size={18} /> Unblock
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;