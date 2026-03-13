import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <div className="p-8 text-center text-2xl">Home Page Content [cite: 184]</div>,
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
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <div className="text-2xl">Dashboard Home [cite: 60, 107, 168]</div>
      },
      {
        path: "/dashboard/profile",
        element: <div className="text-2xl">Profile Page [cite: 50]</div>
      }
    ]
  }
]);

export default router;