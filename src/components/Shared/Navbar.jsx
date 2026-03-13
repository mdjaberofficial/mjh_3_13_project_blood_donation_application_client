import { Link, NavLink } from "react-router";
import { FaHeartbeat } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut().catch(err => console.error(err));
    };

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/donation-requests">Donation Requests</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            {/* Optional: Add Fundings link if you tackle the Stripe optional requirement early */}
            {/* <li><NavLink to="/fundings">Fundings</NavLink></li> */}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 md:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl text-primary flex items-center gap-2">
                    <FaHeartbeat className="text-2xl" />
                    <span className="font-bold hidden sm:block">BloodConnect</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end gap-3">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full border-2 border-primary">
                                <img alt="User Avatar" src={user?.photoURL || "https://i.ibb.co/MxgVsK4/default-avatar.png"} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><button onClick={handleLogOut} className="text-error">Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary text-white rounded-full px-6">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;