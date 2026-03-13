import { Link, NavLink } from "react-router";
import { FaHeartbeat } from "react-icons/fa";
import { FiLogOut, FiLayout, FiUser } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = async () => {
        try {
            await logOut();
            toast.success("Logged out successfully");
        } catch (error) {
            console.error(error);
            toast.error("Logout failed");
        }
    };

    const navLinks = (
        <>
            <li>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => isActive ? "text-primary font-bold bg-transparent" : "hover:text-primary transition-colors"}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/donation-requests" 
                    className={({ isActive }) => isActive ? "text-primary font-bold bg-transparent" : "hover:text-primary transition-colors"}
                >
                    Donation Requests
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/blog" 
                    className={({ isActive }) => isActive ? "text-primary font-bold bg-transparent" : "hover:text-primary transition-colors"}
                >
                    Blog
                </NavLink>
            </li>
            {/* You can add 'Fundings' here if you implement Stripe later */}
        </>
    );

    return (
        <div className="navbar bg-base-100/80 backdrop-blur-md shadow-sm sticky top-0 z-[100] px-4 md:px-12 py-3">
            <div className="navbar-start">
                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-0 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-base-100 rounded-2xl w-64 gap-2">
                        {navLinks}
                    </ul>
                </div>
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-primary p-2 rounded-xl group-hover:scale-110 transition-transform">
                        <FaHeartbeat className="text-xl md:text-2xl text-white animate-pulse" />
                    </div>
                    <span className="text-xl md:text-2xl font-black text-neutral tracking-tight">
                        Blood<span className="text-primary">Connect</span>
                    </span>
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-6 font-semibold text-neutral/80">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end gap-4">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online ring ring-primary/20 ring-offset-2">
                            <div className="w-10 rounded-full">
                                <img 
                                    alt="User Profile" 
                                    src={user?.photoURL || "https://i.ibb.co/MxgVsK4/default-avatar.png"} 
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-4 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-60 border border-base-200">
                            <div className="px-4 py-3 border-b mb-2">
                                <p className="font-bold text-neutral truncate">{user?.displayName}</p>
                                <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
                            </div>
                            <li>
                                <Link to="/dashboard" className="py-3 flex items-center gap-3 hover:text-primary">
                                    <FiLayout className="text-lg" /> Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/profile" className="py-3 flex items-center gap-3 hover:text-primary">
                                    <FiUser className="text-lg" /> Profile
                                </Link>
                            </li>
                            <div className="divider my-1"></div>
                            <li>
                                <button 
                                    onClick={handleLogOut} 
                                    className="py-3 flex items-center gap-3 text-error hover:bg-error/10"
                                >
                                    <FiLogOut className="text-lg" /> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link 
                            to="/login" 
                            className="btn btn-ghost hidden sm:flex text-neutral font-bold rounded-full px-6"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/register" 
                            className="btn btn-primary text-white rounded-full px-6 shadow-lg shadow-primary/30"
                        >
                            Join Now
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;