import { NavLink, Link, Outlet } from "react-router";
import { FaHeartbeat } from "react-icons/fa";
import { 
    FiHome, 
    FiUser, 
    FiPlusSquare, 
    FiList, 
    FiUsers, 
    FiSettings, 
    FiMenu,
    FiFileText,
    FiActivity
} from "react-icons/fi";
import useRole from "../hooks/useRole";
import { Helmet } from 'react-helmet-async';
const Dashboard = () => {
    // Assuming useRole returns [role, isLoading]
    const [role] = useRole();

    const navLinks = (
        <>
            {/* Common Links for everyone */}
            <li>
                <NavLink to="/dashboard" end className={({ isActive }) => 
                    `flex items-center gap-3 p-4 rounded-2xl transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-base-200'}`
                }>
                    <FiGrid className="text-xl" /> Dashboard Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/profile" className={({ isActive }) => 
                    `flex items-center gap-3 p-4 rounded-2xl transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-base-200'}`
                }>
                    <FiUser className="text-xl" /> My Profile
                </NavLink>
            </li>

            {/* Donor Specific Links */}
            {role === 'donor' && (
                <>
                    <li>
                        <NavLink to="/dashboard/create-donation-request" className={({ isActive }) => 
                            `flex items-center gap-3 p-4 rounded-2xl transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-base-200'}`
                        }>
                            <FiPlusSquare className="text-xl" /> Create Request
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/my-donation-requests" className={({ isActive }) => 
                            `flex items-center gap-3 p-4 rounded-2xl transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-base-200'}`
                        }>
                            <FiList className="text-xl" /> My Requests
                        </NavLink>
                    </li>
                </>
            )}

            {/* Admin & Volunteer Shared Links */}
            {(role === 'admin' || role === 'volunteer') && (
                <>
                    <div className="divider opacity-50 my-4 text-[10px] uppercase font-bold tracking-widest">Management</div>
                    <li>
                        <NavLink to="/dashboard/all-blood-donation-request" className={({ isActive }) => 
                            `flex items-center gap-3 p-4 rounded-2xl transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-base-200'}`
                        }>
                            <FiActivity className="text-xl" /> All Donation Requests
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/content-management" className={({ isActive }) => 
                            `flex items-center gap-3 p-4 rounded-2xl transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-base-200'}`
                        }>
                            <FiFileText className="text-xl" /> Content Management
                        </NavLink>
                    </li>
                </>
            )}

            {/* Admin ONLY Links */}
            {role === 'admin' && (
                <li>
                    <NavLink to="/dashboard/all-users" className={({ isActive }) => 
                        `flex items-center gap-3 p-4 rounded-2xl transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-base-200'}`
                    }>
                        <FiUsers className="text-xl" /> All Users
                    </NavLink>
                </li>
            )}

            {/* Shared Bottom Links */}
            <div className="divider opacity-50 my-4 text-[10px] uppercase font-bold tracking-widest">General</div>
            <li>
                <Link to="/" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-base-200 transition-all">
                    <FiHome className="text-xl" /> Back to Home
                </Link>
            </li>
        </>
    );

    return (
        <div className="drawer lg:drawer-open font-sans">
            <Helmet>
                <title>Dashboard | BloodConnect</title>
                
            </Helmet>
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            
            {/* Main Content Area */}
            <div className="drawer-content flex flex-col bg-base-200 min-h-screen">
                {/* Mobile Top Navbar (Hidden on Desktop) */}
                <div className="lg:hidden flex items-center justify-between p-4 bg-base-100 border-b border-base-200 sticky top-0 z-50">
                    <Link to="/" className="flex items-center gap-2">
                        <FaHeartbeat className="text-primary text-2xl" />
                        <span className="font-black text-xl">BloodConnect</span>
                    </Link>
                    <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-circle drawer-button">
                        <FiMenu size={24} />
                    </label>
                </div>
                
                <div className="p-4 md:p-10 flex-grow">
                    {/* The nested routes render here */}
                    <Outlet />
                </div>
            </div> 

            {/* Sidebar Side Area */}
            <div className="drawer-side z-[100]">
                <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                
                <div className="menu p-6 w-80 min-h-full bg-base-100 text-base-content border-r border-base-200 shadow-xl">
                    {/* Brand Logo Section */}
                    <div className="mb-10 px-4">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="bg-primary p-2.5 rounded-2xl group-hover:rotate-12 transition-all shadow-lg shadow-primary/20">
                                <FaHeartbeat className="text-2xl text-white animate-pulse" />
                            </div>
                            <span className="text-2xl font-black text-neutral tracking-tighter">
                                Blood<span className="text-primary">Connect</span>
                            </span>
                        </Link>
                        <div className="mt-4 flex items-center gap-2 px-1">
                            <span className="w-2 h-2 rounded-full bg-success animate-ping"></span>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                                {role || 'User'} Mode
                            </span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <ul className="space-y-1">''
                        {navLinks}
                    </ul>

                    {/* Optional Sidebar Footer */}
                    <div className="mt-auto pt-10 px-4">
                        <div className="p-4 bg-neutral rounded-2xl text-white text-xs text-center">
                            <p className="opacity-60">Logged in as</p>
                            <p className="font-bold truncate mt-1">Administrator Control</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple Icon fallback if needed
const FiGrid = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);

export default Dashboard;