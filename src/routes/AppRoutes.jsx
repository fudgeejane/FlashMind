import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
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
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
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
