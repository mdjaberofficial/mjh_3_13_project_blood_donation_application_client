import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FiUsers, FiHeart, FiActivity } from 'react-icons/fi';

const Stats = () => {
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['home-stats'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:3000/admin-stats');
            return data;
        }
    });

    if (isLoading) return null; // Hide the section until data is ready

    return (
        <section className="py-20 bg-neutral text-neutral-content relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">Our Impact in Numbers</h2>
                    <p className="text-neutral-content/60 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        Join a growing community dedicated to saving lives through blood donation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Total Users */}
                    <div className="stat bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10 text-center hover:bg-white/10 transition-all shadow-xl" data-aos="zoom-in" data-aos-delay="200">
                        <div className="stat-figure text-primary mb-4">
                            <FiUsers className="text-5xl mx-auto" />
                        </div>
                        <div className="stat-title text-neutral-content/70 font-semibold uppercase tracking-wider">Total Donors</div>
                        <div className="stat-value text-5xl font-black text-white my-2">{stats.totalUsers || 0}</div>
                        <div className="stat-desc text-primary font-medium">Verified Lifesavers</div>
                    </div>

                    {/* Total Requests */}
                    <div className="stat bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10 text-center hover:bg-white/10 transition-all shadow-xl" data-aos="zoom-in" data-aos-delay="300">
                        <div className="stat-figure text-secondary mb-4">
                            <FiActivity className="text-5xl mx-auto" />
                        </div>
                        <div className="stat-title text-neutral-content/70 font-semibold uppercase tracking-wider">Requests Made</div>
                        <div className="stat-value text-5xl font-black text-white my-2">{stats.totalRequests || 0}</div>
                        <div className="stat-desc text-secondary font-medium">Critical Needs Met</div>
                    </div>

                    {/* Successful Donations */}
                    <div className="stat bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10 text-center hover:bg-white/10 transition-all shadow-xl" data-aos="zoom-in" data-aos-delay="400">
                        <div className="stat-figure text-error mb-4">
                            <FiHeart className="text-5xl mx-auto" />
                        </div>
                        <div className="stat-title text-neutral-content/70 font-semibold uppercase tracking-wider">Success Stories</div>
                        <div className="stat-value text-5xl font-black text-white my-2">{stats.successfulDonations || 0}</div>
                        <div className="stat-desc text-error font-medium">Lives Impacted</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;