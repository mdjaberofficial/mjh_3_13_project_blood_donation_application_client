import useRole from "../../hooks/useRole"; // Assuming you have a useRole hook
import AdminHome from "./Admin/AdminHome";
import DonorHome from "./Donor/DonorHome";

const DashboardIndex = () => {
    const [role, isLoading] = useRole();

    if (isLoading) return <span className="loading loading-spinner"></span>;

    if (role === 'admin' || role === 'volunteer') {
        return <AdminHome />;
    }

    return <DonorHome/>;
};

export default DashboardIndex;