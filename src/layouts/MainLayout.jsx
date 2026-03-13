import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar";

const MainLayout = () => {
    return (
        <div>
            
            <Navbar />
            
            <main className="min-h-screen">
                <Outlet />
            </main>
            
            {/* Temporary Footer */}
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright © 2026 - All right reserved</p>
                </aside>
            </footer>
        </div>
    );
};

export default MainLayout;