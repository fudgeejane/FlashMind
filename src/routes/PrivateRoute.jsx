import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingPage from "../components/Loading/LoadingPage";
import { useAuthStatus } from "./useAuthStatus";

export default function PrivateRoute({ allowedRoles }) {
  const location = useLocation();
  const { checking, user, userInfo } = useAuthStatus();

  if (checking) {
    return <LoadingPage />;
  }

  if (!user || !user.emailVerified) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  const role = userInfo?.role || "user";

  if (allowedRoles?.length && !allowedRoles.includes(role)) {
    return (
      <Navigate
        to={role === "admin" ? "/admin/dashboard" : "/dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
}
