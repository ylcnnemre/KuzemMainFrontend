import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import AdminPage from "../pages/Admin/AdminPage";
import AddAdmin from "../Components/Admin/AddAdmin/AddAdmin";
import AddAdminPage from "../pages/Admin/AddAdminPage";
import { Permission } from "../common/constants/PermissionList";
import EditAdminPage from "../pages/Admin/EditAdminPage";

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

const authProtectedRoutes: Array<{ path: string, component: React.ReactNode, exact?: boolean, permission: Permission }> = [
  { path: "/anasayfa", component: <Dashboard />, permission: Permission.all },
  { path: "/profile", component: <UserProfile />, permission: Permission.SHOW_PROFILE },
  { path: "/brans", component: <BranchesPage />, permission: Permission.BRANCH_SHOW },
  { path: "/egitmen", component: <TeacherPage />, permission: Permission.TEACHER_SHOW },
  { path: "/egitmen/ekle", component: <AddTeacherPage />, permission: Permission.TEACHER_ADD },
  { path: "/egitmen/duzenle/:id", component: <EditTeacherPage />, permission: Permission.TEACHER_EDIT },
  { path: "/ogrenci", component: <StudentDashboardPage />, permission: Permission.STUDENT_SHOW },
  { path: "/ogrenci/ekle", component: <AddStudentPage />, permission: Permission.STUDENT_ADD },
  { path: "/ogrenci/:id", component: <EditStudentPage />, permission: Permission.STUDENT_EDIT },
  { path: "/brans/ekle", component: <AddBranchPage />, permission: Permission.BRANCH_EDIT },
  { path: "/admin", component: <AdminPage />, permission: Permission.ADMIN_SHOW },
  { path: "/admin/ekle", component: <AddAdminPage />, permission: Permission.ADMIN_ADD },
  {
    path: "/admin/:id", component: <EditAdminPage />, permission: Permission.ADMIN_EDIT
  },
  { path: "/kurs", component: <CoursePage />, permission: Permission.COURSE_SHOW },
  { path: "/kurs/ekle", component: <AddCoursePage />, permission: Permission.COURSE_ADD },
  { path: "/kurs/:id", component: <CourseDetailPage />, permission: Permission.all },
  { path: "/kurs/duzenle/:id", component: <EditCoursePage />, permission: Permission.COURSE_EDIT },
  { path: "/profil", component: <Settings />, permission: Permission.all },
  { path: "/pages-faqs", component: <Faqs />, permission: Permission.all },
  { path: "/test", component: <TestPage />, permission: Permission.all },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/anasayfa" />,
    permission: Permission.all
  },
  { path: "*", component: <Navigate to="/anasayfa" />, permission: Permission.all },
];

const publicRoutes = [
  { path: "/giris", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/kayit", component: <Register /> },

];

export { authProtectedRoutes, publicRoutes };
