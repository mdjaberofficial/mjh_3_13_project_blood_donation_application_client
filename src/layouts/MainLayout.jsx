import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const MainLayout = () => {
    return (
        <div>
            
            <Navbar />
            
            <main className="min-h-screen">
                <Outlet />
            </main>
            
            {/* Temporary Footer */}
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;