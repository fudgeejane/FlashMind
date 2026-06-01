import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingPage from "../components/Loading/LoadingPage";
import { useAuthStatus } from "./useAuthStatus";

export default function LoadingRedirectPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checking, user, userInfo } = useAuthStatus();

  const next = searchParams.get("next") || "/";
  const purpose = searchParams.get("purpose");

  useEffect(() => {
    if (purpose === "signin") {
      if (checking) {
        return undefined;
      }

      if (!user?.emailVerified) {
        navigate("/signin", { replace: true });
        return undefined;
      }

      const role = userInfo?.role || "user";
      const target = role === "admin" ? "/admin/dashboard" : "/dashboard";
      const timer = window.setTimeout(() => {
        navigate(target, { replace: true });
      }, 900);

      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      navigate(next, { replace: true });
    }, 900);

    return () => window.clearTimeout(timer);
  }, [checking, navigate, next, purpose, user?.emailVerified, userInfo?.role]);

  return <LoadingPage />;
}