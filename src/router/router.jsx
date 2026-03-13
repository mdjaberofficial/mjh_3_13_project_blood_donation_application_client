import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import PrivateRoute from "../routes/PrivateRoute";
import Profile from "../pages/Dashboard/Profile/Profile";
import CreateDonationRequest from "../pages/Dashboard/Donor/CreateDonationRequest";
import MyDonationRequests from "../pages/Dashboard/Donor/MyDonationRequests";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllBloodDonationRequests from "../pages/Dashboard/AdminVolunteer/AllBloodDonationRequests";
import UpdateDonationRequest from "../pages/Dashboard/Donor/UpdateDonationRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: "/dashboard",
        element: <div className="text-2xl">Dashboard Home [cite: 60, 107, 168]</div>
      },
      {
        path: "/dashboard/profile",
        element: <Profile />
      },
      {
        path: "/dashboard/create-donation-request",
        element: <CreateDonationRequest />
      },
      {
        path: "/dashboard/my-donation-requests",
        element: <MyDonationRequests />
      },
      {
        path: "/dashboard/all-users",
        element: <AllUsers />
      },
      {
        path: "/dashboard/all-blood-donation-request",
        element: <AllBloodDonationRequests />
      },
      {
      path: "update-donation-request/:id",
      element: <UpdateDonationRequest />
      }
    ]
  }
]);

export default router;