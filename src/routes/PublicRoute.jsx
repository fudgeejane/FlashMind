import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "../components/Loading/LoadingPage";
import { useAuthStatus } from "./useAuthStatus";

export default function PublicRoute({ redirectAuthenticated = false }) {
  const { checking, user } = useAuthStatus();

  if (checking) {
    return <LoadingPage />;
  }

  if (redirectAuthenticated && user?.emailVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
