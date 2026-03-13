import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiShield, FiUserCheck, FiLock, FiUnlock, FiUsers } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all users
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        }
    });

    // Handle Role Change
    const handleRoleChange = async (id, newRole) => {
        try {
            const res = await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
            if (res.data.modifiedCount > 0) {
                toast.success(`User role updated to ${newRole}!`);
                refetch();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update role.");
        }
    };

    // Handle Status Change (Block/Unblock)
    const handleStatusChange = async (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
        const confirmAction = window.confirm(`Are you sure you want to ${newStatus === 'blocked' ? 'block' : 'unblock'} this user?`);
        
        if (confirmAction) {
            try {
                const res = await axiosSecure.patch(`/users/status/${id}`, { status: newStatus });
                if (res.data.modifiedCount > 0) {
                    toast.success(`User is now ${newStatus}!`);
                    refetch();
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to update status.");
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
                        <FiUsers className="text-primary" /> Manage All Users
                    </h2>
                    <p className="text-base-content/70 mt-1">Total Users: {users.length}</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-base-200 text-neutral">
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Role</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.avatar || "https://i.ibb.co/MxgVsK4/default-avatar.png"} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'} text-white capitalize`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>
                                    <span className="badge badge-primary text-white capitalize">{user.role}</span>
                                </td>
                                <td>
                                    <div className="flex justify-center items-center gap-2">
                                        {/* Status Toggle */}
                                        <button 
                                            onClick={() => handleStatusChange(user._id, user.status)}
                                            className={`btn btn-sm btn-circle ${user.status === 'active' ? 'btn-outline btn-error' : 'btn-success text-white'}`}
                                            title={user.status === 'active' ? 'Block User' : 'Unblock User'}
                                        >
                                            {user.status === 'active' ? <FiLock /> : <FiUnlock />}
                                        </button>

                                        {/* Role Actions (Dropdown to save space) */}
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-sm btn-outline btn-primary ml-2" title="Change Role">
                                                <FiShield /> Role
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 mt-1">
                                                <li><button onClick={() => handleRoleChange(user._id, 'donor')} disabled={user.role === 'donor'}>Make Donor</button></li>
                                                <li><button onClick={() => handleRoleChange(user._id, 'volunteer')} disabled={user.role === 'volunteer'}>Make Volunteer</button></li>
                                                <li><button onClick={() => handleRoleChange(user._id, 'admin')} disabled={user.role === 'admin'}>Make Admin</button></li>
                                            </ul>
                                        </div>
                                    </div>
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