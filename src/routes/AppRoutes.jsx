import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Decks from "../pages/Decks/Decks";
import Study from "../pages/Study/Study";
import Profile from "../pages/Profile/Profile";
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

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/decks" element={<Decks />} />
        <Route path="/study" element={<Study />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
