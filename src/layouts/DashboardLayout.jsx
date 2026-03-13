import { Outlet } from "react-router";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">
            {/* Temporary Sidebar */}
            <aside className="w-64 bg-base-200 p-4">
                <h2 className="text-2xl font-bold mb-4 text-primary">Dashboard</h2>
                <ul className="menu">
                    <li><a>Profile</a></li>
                    <li><a>Home</a></li>
                </ul>
            </aside>
            
            {/* Dashboard Content */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;