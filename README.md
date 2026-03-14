# 🩸 BloodConnect

BloodConnect is a full-stack blood donation web application designed to connect blood donors with individuals in urgent need. It features a robust Role-Based Access Control (RBAC) system, allowing Admins, Volunteers, and Donors to interact with the platform securely and efficiently.

## 🚀 Tech Stack

**Frontend:**
* React (Vite)
* Tailwind CSS & DaisyUI (UI/UX)
* React Router (Navigation)
* TanStack Query (Data Fetching & State Management)
* Axios (HTTP Client)
* React Hook Form & React Hot Toast

**Backend:**
* Node.js & Express.js
* MongoDB (Database)
* JSON Web Tokens (JWT) (Authentication)
* Firebase Admin SDK (Secure Service Accounts)

---

## 🛠️ What We Built & Fixed (Development Log)

During our recent development and debugging sessions, we tackled several complex full-stack challenges to ensure the application runs smoothly without infinite loading loops or security flaws.

### 1. Robust Role-Based Access Control (RBAC)
* **What we did:** Implemented strict backend middleware (`verifyToken`, `verifyAdmin`, `verifyStaff`) to protect routes.
* **How we did it:** We extracted the user's email from the decoded JWT and cross-referenced it with our MongoDB `users` collection. We fixed a critical bug where `req.decoded.email` was undefined by utilizing optional chaining (`req.decoded?.email`) and ensured the `verifyStaff` middleware successfully authorized both Admins and Volunteers.

### 2. Eliminating "Infinite Loading" Front-End Bugs
* **What we did:** Fixed the dashboards (Admin, User, My Profile) and tables that were stuck on a permanent loading spinner.
* **How we did it:** 1. Updated the `useRole` hook to return a specific `roleLoading` boolean. 
  2. Prevented React components from rendering before *both* the authentication state and the database data were fully fetched using `if (isLoading || roleLoading)`.
  3. Restored accidentally deleted backend routes (`/users/:email`, `/admin-dashboard-stats`) that were returning `404 Not Found` errors and causing TanStack Query to silently fail and retry infinitely.

### 3. The Donation Request Lifecycle
* **What we did:** Created a seamless system for creating, viewing, and accepting blood donation requests.
* **How we did it:** * Separated concerns in the backend: 
    * `/public-donation-requests` (Returns only `pending` requests for guests).
    * `/all-donation-requests` (Returns all requests for Staff).
    * `/my-donation-requests/:email` (Returns requests made by the user).
    * `/my-donations/:email` (Returns requests the user has accepted).
  * Fixed the "Confirm Donation" modal bug by moving the confirm button outside of the `<form method="dialog">` tag, preventing the browser from canceling the `axiosSecure.patch` database update.

### 4. Content (Blog) Management
* **What we did:** Allowed Admins to manage community stories and public users to read them.
* **How we did it:** Created a dedicated `/published-blogs` public route for the Navbar. Built a secure admin table to toggle blog status between `draft` and `published` using a `PATCH` request, alongside secure `DELETE` functionality.

---

## 🗄️ Backend API Structure Reference

### Authentication & Users
* `POST /jwt` - Generate user token
* `POST /users` - Save new user to DB
* `GET /all-users` - Fetch all users *(Admin)*
* `GET /users/:email` - Get specific user profile *(Secured)*
* `PATCH /users/update-role/:id` - Change user role *(Admin)*

### Donation Requests
* `GET /public-donation-requests` - Fetch `pending` requests *(Public)*
* `GET /all-donation-requests` - Fetch all requests *(Staff)*
* `PATCH /donation-requests/accept/:id` - Assign a donor and change status to `inprogress`
* `PATCH /donation-requests/status/:id` - Update status manually *(Staff)*
* `DELETE /donation-requests/:id` - Permanently remove request *(Admin)*

### Blogs & Content
* `GET /published-blogs` - Fetch live blogs *(Public)*
* `GET /all-blogs` - Fetch all blogs including drafts *(Staff)*
* `PATCH /blogs/status/:id` - Toggle draft/published *(Staff)*

### Analytics
* `GET /admin-stats` - Basic counts for the homepage *(Public)*
* `GET /admin-dashboard-stats` - Aggregated chart data for the dashboard *(Staff)*

---

## 💻 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>