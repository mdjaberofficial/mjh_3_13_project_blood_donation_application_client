import { FaHeartbeat, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-neutral text-neutral-content">
            {/* Main Footer Content */}
            <div className="footer p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Brand Section */}
                <aside className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-2 rounded-lg">
                            <FaHeartbeat className="text-2xl text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">
                            Blood<span className="text-primary">Connect</span>
                        </span>
                    </div>
                    <p className="opacity-70 leading-relaxed">
                        Connecting life-saving donors with those in need. Our platform makes blood donation accessible, fast, and transparent.
                    </p>
                    <div className="flex gap-4">
                        <a className="hover:text-primary transition-all cursor-pointer bg-white/5 p-2 rounded-full"><FaFacebook size={20} /></a>
                        <a className="hover:text-primary transition-all cursor-pointer bg-white/5 p-2 rounded-full"><FaTwitter size={20} /></a>
                        <a className="hover:text-primary transition-all cursor-pointer bg-white/5 p-2 rounded-full"><FaInstagram size={20} /></a>
                        <a className="hover:text-primary transition-all cursor-pointer bg-white/5 p-2 rounded-full"><FaLinkedin size={20} /></a>
                    </div>
                </aside>

                {/* Quick Links */}
                <nav>
                    <h6 className="footer-title text-white opacity-100 border-b border-primary/30 pb-2 mb-4">Community</h6>
                    <Link to="/donation-requests" className="link link-hover opacity-70 hover:opacity-100 hover:text-primary mb-2 block">Recent Requests</Link>
                    <Link to="/search" className="link link-hover opacity-70 hover:opacity-100 hover:text-primary mb-2 block">Find Donors</Link>
                    <Link to="/blog" className="link link-hover opacity-70 hover:opacity-100 hover:text-primary mb-2 block">Health Blogs</Link>
                    <Link to="/volunteers" className="link link-hover opacity-70 hover:opacity-100 hover:text-primary mb-2 block">Volunteers</Link>
                </nav>

                {/* Legal Section */}
                <nav>
                    <h6 className="footer-title text-white opacity-100 border-b border-primary/30 pb-2 mb-4">Support</h6>
                    <a className="link link-hover opacity-70 hover:opacity-100 hover:text-primary mb-2 block">Help Center</a>
                    <a className="link link-hover opacity-70 hover:opacity-100 hover:text-primary mb-2 block">Terms of Service</a>
                    <a className="link link-hover opacity-70 hover:opacity-100 hover:text-primary mb-2 block">Privacy Policy</a>
                    <a className="link link-hover opacity-70 hover:opacity-100 hover:text-primary mb-2 block">Contact Us</a>
                </nav>

                {/* Newsletter / Contact */}
                <div>
                    <h6 className="footer-title text-white opacity-100 border-b border-primary/30 pb-2 mb-4">Stay Connected</h6>
                    <p className="opacity-70 mb-4 text-sm">Subscribe to get emergency blood request alerts in your area.</p>
                    <div className="join w-full">
                        <input type="text" placeholder="email@example.com" className="input input-bordered join-item w-full bg-white/5 border-white/10 focus:border-primary text-sm" />
                        <button className="btn btn-primary join-item rounded-r-xl border-none">Join</button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-50">
                    <p>© {new Date().getFullYear()} BloodConnect Ltd. All rights reserved.</p>
                    <p className="flex gap-4">
                        <span>Built with ❤️ in Bangladesh</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;