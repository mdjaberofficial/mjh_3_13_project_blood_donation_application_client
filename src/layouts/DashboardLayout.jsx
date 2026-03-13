import { Outlet, NavLink, Link } from "react-router";
import { FiMenu, FiHome, FiUser, FiActivity, FiUsers, FiFileText } from "react-icons/fi";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
    const [role, roleLoading] = useRole();

    if (roleLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            
            {/* Main Content Area */}
            <div className="drawer-content flex flex-col bg-base-200 min-h-screen">
                {/* Mobile Navbar */}
                <div className="w-full navbar bg-base-100 lg:hidden shadow-sm sticky top-0 z-40">
                    <div className="flex-none">
                        <label htmlFor="dashboard-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <FiMenu className="text-2xl" />
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 font-bold text-primary text-xl">Dashboard</div>
                </div>
                
                {/* Dynamic Page Content */}
                <div className="p-4 md:p-8 flex-1">
                    <Outlet />
                </div>
            </div> 
            
            {/* Sidebar / Drawer */}
            <div className="drawer-side z-50">
                <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content flex flex-col">
                    {/* Branding */}
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-primary border-b pb-4">BloodConnect</h2>
                    </div>

                    {/* --- Conditional Links Based on Role --- */}
                    {role === 'donor' && (
                        <>
                            <li><NavLink to="/dashboard" end><FiHome /> Donor Dashboard</NavLink></li>
                            <li><NavLink to="/dashboard/my-donation-requests"><FiActivity /> My Donation Requests</NavLink></li>
                            <li><NavLink to="/dashboard/create-donation-request"><FiFileText /> Create Request</NavLink></li>
                        </>
                    )}
                    
                    {role === 'volunteer' && (
                        <>
                            <li><NavLink to="/dashboard" end><FiHome /> Volunteer Dashboard</NavLink></li>
                            <li><NavLink to="/dashboard/all-blood-donation-request"><FiActivity /> All Donation Requests</NavLink></li>
                            <li><NavLink to="/dashboard/content-management"><FiFileText /> Content Management</NavLink></li>
                        </>
                    )}

                    {role === 'admin' && (
                        <>
                            <li><NavLink to="/dashboard" end><FiHome /> Admin Dashboard</NavLink></li>
                            <li><NavLink to="/dashboard/all-users"><FiUsers /> All Users</NavLink></li>
                            <li><NavLink to="/dashboard/all-blood-donation-request"><FiActivity /> All Donation Requests</NavLink></li>
                            <li><NavLink to="/dashboard/content-management"><FiFileText /> Content Management</NavLink></li>
                        </>
                    )}

                    {/* --- Shared Links --- */}
                    <div className="divider"></div>
                    <li><NavLink to="/dashboard/profile"><FiUser /> Profile</NavLink></li>
                    <li className="mt-auto"><Link to="/"><FiHome /> Back to Home</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;