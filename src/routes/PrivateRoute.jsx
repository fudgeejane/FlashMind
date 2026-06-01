import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingPage from "../components/Loading/LoadingPage";
import { useAuthStatus } from "./useAuthStatus";

export default function PrivateRoute() {
  const location = useLocation();
  const { checking, user } = useAuthStatus();

  if (checking) {
    return <LoadingPage />;
  }

  if (!user || !user.emailVerified) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
