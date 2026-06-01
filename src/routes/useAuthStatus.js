import { useAuth } from "../auth/contexts/useAuthContext";

export function useAuthStatus() {
  const { loading, user } = useAuth();

  return {
    checking: loading,
    user,
  };
}
