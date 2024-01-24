import React from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Register from "../pages/Authentication/Register";
import UserProfile from "../pages/Authentication/user-profile";
import Settings from "../pages/Profile/Settings/Settings";
import Faqs from "../pages/Faqs/Faqs";
import TeacherPage from "../pages/Teacher/TeacherPage";
import BranchesPage from "../pages/Branches/BranchesPage";
import AddBranchPage from "../pages/Branches/AddBranchPage";
import AddTeacherPage from "../pages/Teacher/AddTeacherPage";
import EditTeacherPage from "../pages/Teacher/EditTeacherPage";
import CoursePage from "../pages/Course/CoursePage";
import AddCoursePage from "../pages/Course/AddCoursePage";
import TestPage from "../pages/TestPage";

type role = "admin" | "student" | "teacher"

const authProtectedRoutes: Array<{ path: string, component: React.ReactNode, exact?: boolean, role: role[] }> = [
  { path: "/anasayfa", component: <Dashboard />, role: ["student", "admin", "teacher"] },
  { path: "/profile", component: <UserProfile />, role: ["student", "admin", "teacher"] },
  { path: "/egitmen", component: <TeacherPage />, role: ["admin"] },
  { path: "/brans", component: <BranchesPage />, role: ["admin"] },
  { path: "/egitmen/ekle", component: <AddTeacherPage />, role: ["admin"] },
  { path: "/egitmen/duzenle/:id", component: <EditTeacherPage />, role: ["admin"] },
  { path: "/brans/ekle", component: <AddBranchPage />, role: ["admin"] },
  { path: "/kurs", component: <CoursePage />, role: ["admin"] },
  { path: "/kurs/ekle", component: <AddCoursePage />, role: ["admin"] },
  { path: "/pages-profile-settings", component: <Settings />, role: ["admin", "student", "teacher"] },
  { path: "/pages-faqs", component: <Faqs />, role: ["admin", "student", "teacher"] },
  { path: "/test", component: <TestPage />, role: ["admin", "student", "teacher"] },
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