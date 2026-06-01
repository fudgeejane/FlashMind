import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../../firebase/config";
import actionHandler from "../auth/actionHandler";

function getAuthErrorMessage(error, fallback) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Email is already registered.";
    case "auth/Invalid credentials":
    case "auth/Invalid credentials":
    case "auth/Invalid credentials":
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
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters.");
      }

      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = credential;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName,
        lastName,
        email: user.email,
        role,
        createdAt: serverTimestamp(),
      });

      await actionHandler("RESEND_VERIFICATION", { user });

      toast.success("Verification email sent. Please verify your email first.");
      return user;
    } catch (error) {
      toast.error(error.message || getAuthErrorMessage(error, "Registration failed."));
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      await credential.user.reload();

      const currentUser = auth.currentUser;

      if (!currentUser?.emailVerified) {
        await signOut(auth);
        toast.error("Please verify your email before signing in.");
        throw new Error("Email is not verified.");
      }

      return currentUser;
    } catch (error) {
      if (error.message !== "Email is not verified.") {
        toast.error(getAuthErrorMessage(error, "Unable to sign in."));
      }

      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
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
