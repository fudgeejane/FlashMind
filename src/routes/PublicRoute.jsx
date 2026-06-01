import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "../components/Loading/LoadingPage";
import { useAuthStatus } from "./useAuthStatus";

export default function PublicRoute({ redirectAuthenticated = false }) {
  const { checking, user, userInfo } = useAuthStatus();

  if (checking) {
    return <LoadingPage />;
  }

  if (redirectAuthenticated && user?.emailVerified) {
    const role = userInfo?.role || "user";

    return (
      <Navigate
        to={role === "admin" ? "/admin/dashboard" : "/dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
}
