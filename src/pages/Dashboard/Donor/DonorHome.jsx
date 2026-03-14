import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { FiHeart, FiFileText, FiClock } from 'react-icons/fi';

const DonorHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['donor-stats', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/donor-stats/${user?.email}`);
            return data;
        }
    });

    if (isLoading) return <span className="loading loading-dots loading-lg"></span>;

    return (
        <div className="p-6 space-y-8" data-aos="fade-up">
            <div className="bg-gradient-to-r from-error to-red-700 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-4xl font-black italic">Hello, {user?.displayName}!</h2>
                    <p className="text-white/80 mt-2 text-lg">"Your blood is replaceable. A life is not."</p>
                    <button className="btn btn-sm bg-white text-error border-none rounded-full mt-6 hover:bg-base-200">
                        View My History
                    </button>
                </div>
                <FiHeart className="absolute -right-10 -bottom-10 text-[15rem] text-white/10 rotate-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stats shadow-xl rounded-3xl bg-base-100 border border-base-200 p-4">
                    <div className="stat">
                        <div className="stat-figure text-error"><FiFileText size={30}/></div>
                        <div className="stat-title font-bold">Total Requests</div>
                        <div className="stat-value text-error">{stats.totalMyRequests}</div>
                        <div className="stat-desc font-medium">Requests created by you</div>
                    </div>
                </div>
                
                <div className="stats shadow-xl rounded-3xl bg-base-100 border border-base-200 p-4">
                    <div className="stat">
                        <div className="stat-figure text-success"><FiHeart size={30}/></div>
                        <div className="stat-title font-bold">Lives Impacted</div>
                        <div className="stat-value text-success">{stats.successfulDonations}</div>
                        <div className="stat-desc font-medium">Successful donations</div>
                    </div>
                </div>

                <div className="stats shadow-xl rounded-3xl bg-base-100 border border-base-200 p-4">
                    <div className="stat">
                        <div className="stat-figure text-warning"><FiClock size={30}/></div>
                        <div className="stat-title font-bold">Ongoing</div>
                        <div className="stat-value text-warning">{stats.pendingMyRequests}</div>
                        <div className="stat-desc font-medium">Pending requests</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorHome;