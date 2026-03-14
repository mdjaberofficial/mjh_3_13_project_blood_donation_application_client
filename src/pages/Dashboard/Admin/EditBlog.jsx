import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import { Helmet } from 'react-helmet-async';

const EditBlog = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: blog, isLoading } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/blogs/${id}`);
            return data;
        }
    });

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const thumbnail = form.thumbnail.value;
        const content = form.content.value;

        const updatedData = { title, thumbnail, content };

        try {
            const res = await axiosSecure.patch(`/blogs/${id}`, updatedData);
            if (res.data.modifiedCount > 0) {
                toast.success("Blog updated successfully!");
                navigate('/dashboard/content-management');
            }
        } catch (error) {
            toast.error("Failed to update blog.");
        }
    };

    if (isLoading) return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8" data-aos="fade-up">
            <Helmet>
                <title> Edit Blog | BloodConnect</title>
            </Helmet>
            
            <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm gap-2 mb-6 hover:bg-base-300 rounded-xl">
                <FiArrowLeft /> Back to List
            </button>

            <div className="bg-base-100 p-6 md:p-12 rounded-[2.5rem] shadow-2xl border border-base-200">
                <h2 className="text-3xl md:text-4xl font-black text-neutral mb-10 text-center md:text-left">
                    Edit Blog Post
                </h2>
                
                <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-8">
                    {/* Title Field */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-lg text-neutral">Blog Title</span>
                        </label>
                        <input 
                            name="title" 
                            type="text" 
                            defaultValue={blog?.title}
                            placeholder="Enter a catchy title..."
                            className="input input-bordered w-full rounded-2xl h-14 bg-base-200 border-none focus:ring-2 focus:ring-primary/20 transition-all" 
                            required 
                        />
                    </div>

                    {/* Thumbnail Field */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-lg text-neutral">Thumbnail URL</span>
                        </label>
                        <input 
                            name="thumbnail" 
                            type="text" 
                            defaultValue={blog?.thumbnail}
                            placeholder="https://images.unsplash.com/..."
                            className="input input-bordered w-full rounded-2xl h-14 bg-base-200 border-none focus:ring-2 focus:ring-primary/20 transition-all" 
                            required 
                        />
                    </div>

                    {/* Content Field */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-lg text-neutral">Blog Content</span>
                        </label>
                        <textarea 
                            name="content" 
                            defaultValue={blog?.content}
                            placeholder="Write your story here..."
                            className="textarea textarea-bordered w-full rounded-[2rem] h-64 py-6 bg-base-200 border-none focus:ring-2 focus:ring-primary/20 transition-all text-base" 
                            required 
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4">
                        <button type="submit" className="btn btn-primary w-full text-white rounded-[1.5rem] h-16 shadow-lg shadow-primary/30 border-none text-lg font-bold hover:scale-[1.02] active:scale-95 transition-all">
                            <FiSave className="text-xl" /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;