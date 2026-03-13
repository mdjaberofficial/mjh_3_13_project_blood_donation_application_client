import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <div>
            {/* Temporary Navbar */}
            <nav className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl text-primary">BloodConnect</a>
                </div>
            </nav>
            
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