import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FiUsers, FiHeart, FiActivity, FiMapPin } from 'react-icons/fi';

const Stats = () => {
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['home-stats'],
        queryFn: async () => {
            const { data } = await axios.get('https://mjh-3-13-project-blood-donation-app.vercel.app/admin-stats');
            return data;
        }
    });

    if (isLoading) return null;

    return (
        <section className="py-20 bg-neutral text-neutral-content relative overflow-hidden">
            {/* Background Blurs for Modern Look */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-error/5 rounded-full -ml-20 -mb-20 blur-3xl"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4 tracking-tight" data-aos="fade-up">Our Impact in Numbers</h2>
                    <p className="text-neutral-content/60 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        Real-time data showing how our community is coming together to save lives.
                    </p>
                </div>

                {/* Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    {/* Stat 1: Total Users */}
                    <div className="stat bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all shadow-2xl" data-aos="zoom-in" data-aos-delay="100">
                        <div className="stat-figure text-primary mb-3">
                            <FiUsers className="text-4xl mx-auto" />
                        </div>
                        <div className="stat-title text-neutral-content/50 font-bold uppercase text-xs tracking-widest">Total Donors</div>
                        <div className="stat-value text-4xl font-black text-white my-1">{stats.totalUsers || 0}</div>
                        <div className="stat-desc text-primary/80 text-xs font-semibold">Registered Heroes</div>
                    </div>

                    {/* Stat 2: Total Requests */}
                    <div className="stat bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all shadow-2xl" data-aos="zoom-in" data-aos-delay="200">
                        <div className="stat-figure text-secondary mb-3">
                            <FiActivity className="text-4xl mx-auto" />
                        </div>
                        <div className="stat-title text-neutral-content/50 font-bold uppercase text-xs tracking-widest">Active Requests</div>
                        <div className="stat-value text-4xl font-black text-white my-1">{stats.totalRequests || 0}</div>
                        <div className="stat-desc text-secondary/80 text-xs font-semibold">Critical Needs</div>
                    </div>

                    {/* Stat 3: Successful Donations */}
                    <div className="stat bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all shadow-2xl" data-aos="zoom-in" data-aos-delay="300">
                        <div className="stat-figure text-error mb-3">
                            <FiHeart className="text-4xl mx-auto" />
                        </div>
                        <div className="stat-title text-neutral-content/50 font-bold uppercase text-xs tracking-widest">Lives Saved</div>
                        <div className="stat-value text-4xl font-black text-white my-1">{stats.successfulDonations || 0}</div>
                        <div className="stat-desc text-error/80 text-xs font-semibold">Success Stories</div>
                    </div>

                    {/* Stat 4: NEW - Districts Covered */}
                    <div className="stat bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-center hover:bg-white/10 transition-all shadow-2xl" data-aos="zoom-in" data-aos-delay="400">
                        <div className="stat-figure text-warning mb-3">
                            <FiMapPin className="text-4xl mx-auto" />
                        </div>
                        <div className="stat-title text-neutral-content/50 font-bold uppercase text-xs tracking-widest">Reach</div>
                        <div className="stat-value text-4xl font-black text-white my-1">{stats.totalDistricts || 0}</div>
                        <div className="stat-desc text-warning/80 text-xs font-semibold">Districts Covered</div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Stats;