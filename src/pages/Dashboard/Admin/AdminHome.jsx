import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, } from 'recharts';
import { FiUsers, FiActivity, FiDroplet, FiStar } from 'react-icons/fi';

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-db-stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/admin-dashboard-stats');
            return data;
        }
    });

    if (isLoading) return <div className="flex justify-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;

    return (
        <div className="p-2 md:p-6 space-y-8" data-aos="fade-up">
            {/* Welcome Header */}
            <div className="bg-neutral p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row justify-between items-center shadow-xl relative overflow-hidden">
                <div className="relative z-10 text-center md:text-left">
                    <h2 className="text-3xl font-black">Welcome back, {user?.displayName}!</h2>
                    <p className="opacity-70 mt-2">Here's what's happening with BloodConnect today.</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md mt-4 md:mt-0 flex items-center gap-3">
                    <FiStar className="text-yellow-400 text-2xl" />
                    <span className="font-bold uppercase tracking-widest text-sm">Admin Dashboard</span>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            </div>

            {/* Quick Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-base-100 p-6 rounded-3xl shadow-lg border border-base-200 flex items-center gap-6">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary"><FiUsers size={32} /></div>
                    <div>
                        <p className="text-sm font-bold opacity-50 uppercase">Total Donors</p>
                        <h3 className="text-3xl font-black">{stats.summary?.totalDonors}</h3>
                    </div>
                </div>
                <div className="bg-base-100 p-6 rounded-3xl shadow-lg border border-base-200 flex items-center gap-6">
                    <div className="p-4 bg-error/10 rounded-2xl text-error"><FiDroplet size={32} /></div>
                    <div>
                        <p className="text-sm font-bold opacity-50 uppercase">Active Requests</p>
                        <h3 className="text-3xl font-black">{stats.summary?.pendingRequests}</h3>
                    </div>
                </div>
                <div className="bg-base-100 p-6 rounded-3xl shadow-lg border border-base-200 flex items-center gap-6">
                    <div className="p-4 bg-secondary/10 rounded-2xl text-secondary"><FiActivity size={32} /></div>
                    <div>
                        <p className="text-sm font-bold opacity-50 uppercase">Staff Members</p>
                        <h3 className="text-3xl font-black">{stats.summary?.totalVolunteers}</h3>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                
                {/* Blood Group Distribution Bar Chart */}
                <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-200">
                    <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                        <FiDroplet className="text-error" /> Blood Group Stock (Donors)
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.bloodGroupData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                                <Bar dataKey="count" fill="#ef4444" radius={[8, 8, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Request Status Pie Chart */}
                <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-200">
                    <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                        <FiActivity className="text-primary" /> Request Status Overview
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.statusData}
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {stats.statusData?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;