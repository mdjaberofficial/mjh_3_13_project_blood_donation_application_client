import { FaHeartbeat, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content">
            <aside>
                <FaHeartbeat className="text-5xl text-primary mb-2" />
                <p className="font-bold text-xl">BloodConnect Ltd.</p>
                <p>Providing reliable blood donation connections since 2026.</p>
            </aside> 
            <nav>
                <h6 className="footer-title">Community</h6> 
                <a className="link link-hover">Recent Requests</a>
                <a className="link link-hover">Top Donors</a>
                <a className="link link-hover">Volunteers</a>
            </nav> 
            <nav>
                <h6 className="footer-title">Legal</h6> 
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
            <nav>
                <h6 className="footer-title">Social</h6> 
                <div className="flex gap-4 text-2xl">
                    <a className="cursor-pointer hover:text-primary transition-colors"><FaFacebook /></a>
                    <a className="cursor-pointer hover:text-primary transition-colors"><FaTwitter /></a>
                    <a className="cursor-pointer hover:text-primary transition-colors"><FaInstagram /></a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;
