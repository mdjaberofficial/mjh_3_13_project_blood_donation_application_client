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
import DonationRequests from "../pages/DonationRequests/DonationRequests";
import RequestDetails from "../pages/DonationRequests/RequestDetails";
import Search from "../pages/Search/Search";
import AddBlog from "../pages/Dashboard/AdminVolunteer/ContentManagement/AddBlog";
import ContentManagement from "../pages/Dashboard/AdminVolunteer/ContentManagement/ContentManagement";
import Blog from "../pages/Blog/Blog";
import AllDonationRequests from "../pages/Dashboard/AdminVolunteer/AllDonationRequests";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import DashboardIndex from "../pages/Dashboard/DashboardIndex";
import EditBlog from "../pages/Dashboard/Admin/EditBlog";
import DonationDetails from "../pages/DonationRequests/RequestDetails";

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
      },
      {
      path: "/donation-requests",
      element: <DonationRequests />
      },
      {
       path: "/donation-request-details/:id",
        element: <RequestDetails />
      },
      {
      path: "/search",
      element: <Search />
      },
      {
        path: "/blog",
        element: <Blog />
      },
      {
        path: "all-blood-donation-request",
        element: <AllDonationRequests />
      },
      {
       path: "donation-request-details/:id",
       element: <DonationDetails />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true, // This makes it the default view when hitting /dashboard
        element: <DashboardIndex />
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
      },
      {
        path: "content-management/add-blog",
        element: <AddBlog />
      },
      {
       path: "content-management",
       element: <ContentManagement />
      },
      {
       path: "content-management/edit-blog/:id",
       element: <EditBlog />
      }
    
    ]
  }
]);

export default router;