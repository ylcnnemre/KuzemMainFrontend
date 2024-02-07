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
import DetailCourse from "../Components/Course/DetailCourse/DetailCourse";
import CourseDetailPage from "../pages/Course/CourseDetailPage";
import EditCoursePage from "../pages/Course/EditCoursePage";
import StudentDashboardPage from "../pages/Student/StudentDashboardPage";
import AddStudentPage from "../pages/Student/AddStudentPage";
import EditStudent from "../Components/Student/EditStudent/EditStudent";
import EditStudentPage from "../pages/Student/EditStudentPage";

type role = "admin" | "student" | "teacher" | "superadmin"

const authProtectedRoutes: Array<{ path: string, component: React.ReactNode, exact?: boolean, role: role[] }> = [
  { path: "/anasayfa", component: <Dashboard />, role: ["student", "admin", "teacher", "superadmin"] },
  { path: "/profile", component: <UserProfile />, role: ["student", "admin", "teacher", "superadmin"] },
  { path: "/brans", component: <BranchesPage />, role: ["admin", "superadmin"] },
  { path: "/egitmen", component: <TeacherPage />, role: ["admin", "superadmin"] },
  { path: "/egitmen/ekle", component: <AddTeacherPage />, role: ["admin", "superadmin"] },
  { path: "/egitmen/duzenle/:id", component: <EditTeacherPage />, role: ["admin", "superadmin"] },
  { path: "/ogrenci", component: <StudentDashboardPage />, role: ["admin", "superadmin"] },
  { path: "/ogrenci/ekle", component: <AddStudentPage />, role: ["admin", "superadmin"] },
  { path: "/ogrenci/:id", component: <EditStudentPage />, role: ["admin", "superadmin"] },
  { path: "/brans/ekle", component: <AddBranchPage />, role: ["admin", "superadmin"] },
  { path: "/kurs", component: <CoursePage />, role: ["admin", "teacher", "superadmin","student"] },
  { path: "/kurs/ekle", component: <AddCoursePage />, role: ["admin", "superadmin"] },
  { path: "/kurs/:id", component: <CourseDetailPage />, role: ["admin", "student", "teacher", "superadmin"] },
  { path: "/kurs/duzenle/:id", component: <EditCoursePage />, role: ["admin", "superadmin"] },
  { path: "/profil", component: <Settings />, role: ["admin", "student", "teacher", "superadmin"] },
  { path: "/pages-faqs", component: <Faqs />, role: ["admin", "student", "teacher", "superadmin"] },
  { path: "/test", component: <TestPage />, role: ["admin", "student", "teacher", "superadmin"] },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/anasayfa" />,
    role: ["admin", "student", "teacher"]
  },
  { path: "*", component: <Navigate to="/anasayfa" />, role: ["superadmin", "admin", "teacher", "student"] },
];

const publicRoutes = [
  { path: "/giris", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/kayit", component: <Register /> },

];

export { authProtectedRoutes, publicRoutes };