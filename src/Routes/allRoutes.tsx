import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Authentication/Login"));
const ForgetPasswordPage = lazy(() => import("../pages/Authentication/ForgetPassword"));
const Register = lazy(() => import("../pages/Authentication/Register"));
const UserProfile = lazy(() => import("../pages/Authentication/user-profile"));
const Settings = lazy(() => import("../pages/Profile/Settings/Settings"));
const Faqs = lazy(() => import("../pages/Faqs/Faqs"));
const TeacherPage = lazy(() => import("../pages/Teacher/TeacherPage"));
const BranchesPage = lazy(() => import("../pages/Branches/BranchesPage"));
const AddBranchPage = lazy(() => import("../pages/Branches/AddBranchPage"));
const AddTeacherPage = lazy(() => import("../pages/Teacher/AddTeacherPage"));
const EditTeacherPage = lazy(() => import("../pages/Teacher/EditTeacherPage"));
const CoursePage = lazy(() => import("../pages/Course/CoursePage"));
const AddCoursePage = lazy(() => import("../pages/Course/AddCoursePage"));
const TestPage = lazy(() => import("../pages/TestPage"));
const DetailCourse = lazy(() => import("../Components/Course/DetailCourse/DetailCourse"));
const CourseDetailPage = lazy(() => import("../pages/Course/CourseDetailPage"));
const EditCoursePage = lazy(() => import("../pages/Course/EditCoursePage"));
const StudentDashboardPage = lazy(() => import("../pages/Student/StudentDashboardPage"));
const AddStudentPage = lazy(() => import("../pages/Student/AddStudentPage"));
const EditStudent = lazy(() => import("../Components/Student/EditStudent/EditStudent"));
const EditStudentPage = lazy(() => import("../pages/Student/EditStudentPage"));

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
