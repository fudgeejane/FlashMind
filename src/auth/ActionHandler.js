import {
  applyActionCode,
  confirmPasswordReset,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase/config";

function getAppUrl(path) {
  return `${window.location.origin}${path}`;
}

const AUTH_ACTIONS = {
  VERIFY_EMAIL: async ({ token }) => {
    if (!token) {
      throw new Error("Verification token is missing.");
    }

    await applyActionCode(auth, token);
    await auth.currentUser?.reload();

    return { success: true };
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
