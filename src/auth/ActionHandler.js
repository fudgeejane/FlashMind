import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

function getAppUrl(path) {
  return `${window.location.origin}${path}`;
}

const AUTH_ACTIONS = {
  REGISTER: async ({ firstName, lastName, email, password, role = "user" }) => {
    if (!firstName || !lastName || !email) {
      throw new Error("All registration fields are required.");
    }

    if (!password || password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }

    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = credential;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      firstName,
      lastName,
      email: user.email,
      role,
      createdAt: serverTimestamp(),
    });

    await sendEmailVerification(user, {
      url: getAppUrl("/auth/verify-email"),
    });

    return { success: true, user };
  },

  LOGIN: async ({ email, password }) => {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const credential = await signInWithEmailAndPassword(auth, email, password);
    await credential.user.reload();

    const currentUser = auth.currentUser;

    if (!currentUser?.emailVerified) {
      await signOut(auth);
      throw new Error("Please verify your email before signing in.");
    }

    return { success: true, user: currentUser };
  },

  LOGOUT: async () => {
    await signOut(auth);

    return { success: true };
  },

  VERIFY_EMAIL: async ({ token }) => {
    if (!token) {
      throw new Error("Verification token is missing.");
    }

    await applyActionCode(auth, token);
    await auth.currentUser?.reload();

    return { success: true, user: auth.currentUser };
  },

  RESET_PASSWORD: async ({ token, password }) => {
    if (!token) {
      throw new Error("Password reset token is missing.");
    }

    if (!password || password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }

    await confirmPasswordReset(auth, token, password);

    return { success: true };
  },

  RESEND_VERIFICATION: async ({ user = auth.currentUser } = {}) => {
    if (!user) {
      throw new Error("No authenticated user found.");
    }

    await sendEmailVerification(user, {
      url: getAppUrl("/auth/verify-email"),
    });

    return { success: true };
  },

  SEND_RESET_EMAIL: async ({ email }) => {
    if (!email) {
      throw new Error("Email is required.");
    }

    await sendPasswordResetEmail(auth, email, {
      url: getAppUrl("/auth/reset-password"),
    });

    return { success: true };
  },
};

export default async function actionHandler(type, payload = {}) {
  const action = AUTH_ACTIONS[type];

  if (!action) {
    throw new Error(`Unsupported auth action: ${type}`);
  }

  return action(payload);
}
