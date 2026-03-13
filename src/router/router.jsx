import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

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
        element: <div className="p-8 text-center text-2xl">Login Page Content [cite: 44, 45]</div>,
      },
      {
        path: "/register",
        element: <div className="p-8 text-center text-2xl">Register Page Content [cite: 26, 27]</div>,
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