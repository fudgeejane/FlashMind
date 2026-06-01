import toast from "react-hot-toast";
import actionHandler from "../auth/ActionHandler";

function getAuthErrorMessage(error, fallback) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Email is already registered.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid credentials.";
    case "auth/weak-password":
      return "Password must be at least 8 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return fallback;
  }
}

export function useFirebaseAuth() {
  const register = async ({
    firstName,
    lastName,
    email,
    password,
    role = "user",
  }) => {
    try {
      const result = await actionHandler("REGISTER", {
        firstName,
        lastName,
        email,
        password,
        role,
      });

      toast.success("Verification email sent. Please verify your email first.");
      return result.user;
    } catch (error) {
      toast.error(error.message || getAuthErrorMessage(error, "Registration failed."));
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const result = await actionHandler("LOGIN", { email, password });
      return result.user;
    } catch (error) {
      if (error.message === "Please verify your email before signing in.") {
        toast.error(error.message);
        throw error;
      }

      toast.error(getAuthErrorMessage(error, "Unable to sign in."));

      throw error;
    }
  };

  const logout = async () => {
    try {
      await actionHandler("LOGOUT");
    } catch (error) {
      toast.error("Unable to sign out.");
      throw error;
    }
  };

  return {
    register,
    login,
    logout,
  };
}
