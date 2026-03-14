import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FiPlusCircle, FiImage, FiType, FiFileText } from "react-icons/fi";

const AddBlog = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const blogInfo = {
            title: data.title,
            thumbnail: data.thumbnail,
            content: data.content,
            status: "draft", // Blogs are drafts by default
            createdAt: new Date().toISOString(),
        };

        try {
            const res = await axiosSecure.post("/blogs", blogInfo);
            if (res.data.insertedId) {
                toast.success("Blog created as draft!");
                reset();
                navigate("/dashboard/content-management");
            }
        } catch (error) {
            toast.error("Failed to create blog");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-base-100 rounded-[2rem] shadow-2xl overflow-hidden border border-base-200" data-aos="fade-up">
                <div className="bg-neutral p-8 text-white">
                    <h2 className="text-3xl font-black flex items-center gap-3">
                        <FiPlusCircle className="text-primary" /> Create New Blog
                    </h2>
                    <p className="opacity-70 mt-1">Share health tips and donor stories with the community.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-8">
                    {/* Blog Title */}
                    <div className="form-control w-full">
                        <label className="label font-bold text-neutral">Blog Title</label>
                        <div className="relative">
                            <FiType className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                            <input 
                                type="text" 
                                {...register("title", { required: true })} 
                                placeholder="e.g., 5 Benefits of Regular Blood Donation" 
                                className="input input-bordered w-full pl-12 h-14 rounded-2xl bg-base-200 border-none focus:ring-2 ring-primary"
                            />
                        </div>
                    </div>

                    {/* Thumbnail URL */}
                    <div className="form-control w-full">
                        <label className="label font-bold text-neutral">Thumbnail Image URL</label>
                        <div className="relative">
                            <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                            <input 
                                type="text" 
                                {...register("thumbnail", { required: true })} 
                                placeholder="https://image-link.com/photo.jpg" 
                                className="input input-bordered w-full pl-12 h-14 rounded-2xl bg-base-200 border-none focus:ring-2 ring-primary"
                            />
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="form-control w-full">
                        <label className="label font-bold text-neutral">Blog Content</label>
                        <div className="relative">
                            <FiFileText className="absolute left-4 top-6 text-primary" />
                            <textarea 
                                {...register("content", { required: true })} 
                                className="textarea textarea-bordered w-full pl-12 pt-4 h-64 rounded-2xl bg-base-200 border-none focus:ring-2 ring-primary text-base" 
                                placeholder="Write your content here..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full h-14 text-white rounded-2xl text-lg shadow-xl shadow-primary/20 border-none">
                        Create Blog Draft
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;