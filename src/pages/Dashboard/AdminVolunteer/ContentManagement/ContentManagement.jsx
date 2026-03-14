import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useRole from '../../../../hooks/useRole';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiCheckCircle, FiFileText, FiEyeOff, FiEdit3 } from 'react-icons/fi';

const ContentManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [role, roleLoading] = useRole();

    // Fetching all blogs for management
    const { data: blogs = [], isLoading, refetch } = useQuery({
        queryKey: ['all-blogs'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-blogs');
            return data;
        }
    });

    // Handle Publish/Unpublish status updates
    const handleUpdateStatus = async (id, newStatus) => {
        const loadingToast = toast.loading(`Setting blog to ${newStatus}...`);
        try {
            const res = await axiosSecure.patch(`/blogs/status/${id}`, { status: newStatus });
            toast.dismiss(loadingToast);

            if (res.data.modifiedCount > 0) {
                toast.success(`Blog successfully ${newStatus === 'published' ? 'published' : 'moved to draft'}`);
                refetch();
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    // Handle blog deletion
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to permanently delete this blog?")) {
            try {
                const res = await axiosSecure.delete(`/blogs/${id}`);
                if (res.data.deletedCount > 0) {
                    toast.success("Blog deleted successfully");
                    refetch();
                }
            } catch (error) {
                toast.error("Failed to delete blog");
            }
        }
    };

    // Wait for both role and data to ensure UI consistency
    if (isLoading || roleLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="bg-base-100 rounded-[2.5rem] shadow-xl p-6 md:p-10 mt-8 border border-base-200" data-aos="fade-up">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                <div>
                    <h2 className="text-3xl font-black text-neutral flex items-center gap-3">
                        <FiFileText className="text-primary" /> Content Management
                    </h2>
                    <p className="text-base-content/60">Draft, publish, and manage your community stories.</p>
                </div>
                <Link to="/dashboard/content-management/add-blog" className="btn btn-primary text-white rounded-2xl px-8 shadow-lg shadow-primary/20 border-none group">
                    <FiPlus size={20} className="group-hover:rotate-90 transition-transform" /> Add Blog
                </Link>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto rounded-3xl border border-base-200">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200 h-16 text-neutral font-bold uppercase text-xs tracking-widest text-center">
                        <tr>
                            <th className="text-left">Thumbnail & Title</th>
                            <th>Status</th>
                            <th>Manage</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-20 opacity-50 italic text-lg">
                                    No blogs created yet. Start by adding one!
                                </td>
                            </tr>
                        ) : (
                            blogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-base-200/50 transition-colors">
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-16 h-16 shadow-md border border-base-300">
                                                    <img 
                                                        src={blog.thumbnail} 
                                                        alt={blog.title} 
                                                        referrerPolicy="no-referrer"
                                                        onError={(e) => e.target.src = "https://i.ibb.co/MxgVsK4/default-avatar.png"}
                                                    />
                                                </div>
                                            </div>
                                            <div className="max-w-xs md:max-w-md text-left">
                                                <div className="font-bold text-neutral leading-tight text-lg">{blog.title}</div>
                                                <div className="text-xs opacity-50 truncate mt-1 max-w-[200px] md:max-w-xs italic">
                                                    {blog.content.replace(/<[^>]*>?/gm, '')}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span className={`badge font-bold text-[10px] uppercase px-4 py-3 border-none shadow-sm ${
                                            blog.status === 'published' 
                                            ? 'bg-success/10 text-success' 
                                            : 'bg-warning/10 text-warning'
                                        }`}>
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        {role === 'admin' ? (
                                            blog.status === 'draft' ? (
                                                <button 
                                                    onClick={() => handleUpdateStatus(blog._id, 'published')} 
                                                    className="btn btn-sm btn-ghost text-success gap-2 hover:bg-success/10 rounded-xl"
                                                >
                                                    <FiCheckCircle /> Publish
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => handleUpdateStatus(blog._id, 'draft')} 
                                                    className="btn btn-sm btn-ghost text-warning gap-2 hover:bg-warning/10 rounded-xl"
                                                >
                                                    <FiEyeOff /> Unpublish
                                                </button>
                                            )
                                        ) : (
                                            <span className="text-[10px] opacity-40 uppercase font-bold italic">Pending Admin</span>
                                        )}
                                    </td>
                                    <td className="text-center">
                                        <div className="flex justify-center items-center gap-2">
                                            {/* Edit Button */}
                                            <Link 
                                                to={`/dashboard/content-management/edit-blog/${blog._id}`} 
                                                className="btn btn-sm btn-circle btn-ghost text-info hover:bg-info/10"
                                                title="Edit Blog"
                                            >
                                                <FiEdit3 size={18} />
                                            </Link>
                                            
                                            {/* Delete Button */}
                                            <button 
                                                onClick={() => handleDelete(blog._id)} 
                                                className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error/10"
                                                title="Delete Blog"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContentManagement;