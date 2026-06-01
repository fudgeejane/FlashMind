import { useAuth } from "../auth/contexts/useAuthContext";

export function useAuthStatus() {
  const { loading, user, userInfo } = useAuth();

  return {
    checking: loading,
    user,
    userInfo,
  };
}
