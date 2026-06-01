import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Login from "../auth/Login";
import Register from "../auth/Register";
import EmailVerificationPage from "../auth/pages/EmailVerificationPage";
import ResetPasswordPage from "../auth/pages/ResetPasswordPage";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Users/Dashboard/Dashboard";
import Decks from "../pages/Users/Decks/Decks";
import Study from "../pages/Users/Study/Study";
import Profile from "../pages/Users/Profile/Profile";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import UserManagement from "../pages/Admin/UserManagement";
import Inquiries from "../pages/Admin/Inquiries";
import Logs from "../pages/Admin/Logs";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Landing />} />
      </Route>

      <Route element={<PublicRoute redirectAuthenticated />}>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/auth/verify-email" element={<EmailVerificationPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/reset-password/:token" element={<ResetPasswordPage />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={["user"]} />}>
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/decks" element={<Decks />} />
          <Route path="/study" element={<Study />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/inquiries" element={<Inquiries />} />
          <Route path="/admin/logs" element={<Logs />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
