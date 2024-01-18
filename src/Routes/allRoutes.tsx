import React from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Register from "../pages/Authentication/Register";
import UserProfile from "../pages/Authentication/user-profile";
import Settings from "../pages/Profile/Settings/Settings";
import Faqs from "../pages/Faqs/Faqs";
import TeacherDashboard from "../pages/TeacherDashboard/TeacherDashboard";
import AddTeacherPage from "../pages/AddTeacher/AddTeacherPage";
import BranchesPage from "../pages/Branches/BranchesPage";

type role = "admin" | "student" | "teacher"

const authProtectedRoutes: Array<{ path: string, component: React.ReactNode, exact?: boolean, role: role[] }> = [
  { path: "/anasayfa", component: <Dashboard />, role: ["student", "admin", "teacher"] },
  { path: "/profile", component: <UserProfile />, role: ["student", "admin", "teacher"] },
  { path: "/egitmen", component: <TeacherDashboard />, role: ["admin"] },
  { path: "/brans", component: <BranchesPage />, role: ["admin"] },
  { path: "/egitmen/ekle", component: <AddTeacherPage />, role: ["admin"] },
  { path: "/pages-profile-settings", component: <Settings />, role: ["admin", "student", "teacher"] },
  { path: "/pages-faqs", component: <Faqs />, role: ["admin", "student", "teacher"] },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/anasayfa" />,
    role: ["admin", "student", "teacher"]
  },
  { path: "*", component: <Navigate to="/anasayfa" />, role: ["admin", "teacher", "student"] },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

];

export { authProtectedRoutes, publicRoutes };