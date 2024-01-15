import React from "react";
import { Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import UserProfile from "../pages/Authentication/user-profile";
import Settings from "../pages/Profile/Settings/Settings";
import Faqs from "../pages/Faqs/Faqs";



const authProtectedRoutes = [
  { path: "/anasayfa", component: <Dashboard /> },
  { path: "/index", component: <Dashboard /> },
  { path: "/profile", component: <UserProfile /> },
  { path: "/pages-profile-settings", component: <Settings /> },
  { path: "/pages-faqs", component: <Faqs /> },
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/anasayfa" />,
  },
  { path: "*", component: <Navigate to="/anasayfa" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

];

export { authProtectedRoutes, publicRoutes };