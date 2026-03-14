import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import { FaBookOpen } from 'react-icons/fa6';
import { Helmet } from 'react-helmet-async';
const Blog = () => {
    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['public-blogs'],
        queryFn: async () => {
            const { data } = await axios.get('https://mjh-3-13-project-blood-donation-app.vercel.app/published-blogs');
            return data;
        }
    });

    if (isLoading) return (
        <div className="flex justify-center items-center h-[60vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4">
            <Helmet>
                <title>Blogs | BloodConnect</title>
            </Helmet>
            
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16" data-aos="fade-down">
                    <h1 className="text-4xl md:text-5xl font-black text-neutral mb-4">Health & Donation <span className="text-primary">Insights</span></h1>
                    <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
                        Stay informed with the latest tips on blood donation, health, and community impact.
                    </p>
                </div>

                {blogs.length === 0 ? (
                    <div className="text-center bg-base-100 p-20 rounded-[3rem] shadow-xl border border-base-300">
                        <FaBookOpen className="text-6xl text-base-content/10 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold">No Published Blogs Yet</h2>
                        <p className="text-base-content/50 mt-2">Check back soon for inspiring stories and health tips.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {blogs.map((blog, index) => (
                            <div 
                                key={blog._id} 
                                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-300 overflow-hidden group"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <figure className="relative h-60 overflow-hidden">
                                    <img 
                                    src={blog.thumbnail} 
                                    alt={blog.title} 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="badge badge-primary text-white font-bold p-3 rounded-lg shadow-lg">New</span>
                                    </div>
                                </figure>
                                <div className="card-body p-8">
                                    <div className="flex items-center gap-2 text-xs text-base-content/50 mb-3 font-semibold uppercase tracking-wider">
                                        <FiCalendar className="text-primary" />
                                        {new Date(blog.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </div>
                                    <h2 className="card-title text-2xl font-bold text-neutral group-hover:text-primary transition-colors line-clamp-2">
                                        {blog.title}
                                    </h2>
                                    <p className="text-base-content/70 mt-3 line-clamp-3 leading-relaxed">
                                        {blog.content}
                                    </p>
                                    <div className="card-actions mt-8">
                                        <button className="btn btn-ghost p-0 hover:bg-transparent text-primary font-bold group/btn">
                                            Read More 
                                            <FiArrowRight className="ml-2 transform group-hover/btn:translate-x-2 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;