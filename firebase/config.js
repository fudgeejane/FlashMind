import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

function validateFirebaseConfig(config) {
  const requiredKeys = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ];

  const missingKeys = requiredKeys.filter((key) => !config[key]?.toString().trim());
  if (missingKeys.length) {
    throw new Error(
      `Missing Firebase config values: ${missingKeys.join(", ")}. Add them to .env with the VITE_FIREBASE_ prefix and restart the dev server.`
    );
  }

  const apiKeyPattern = /^AIza[0-9A-Za-z_-]{35}$/;
  if (!apiKeyPattern.test(config.apiKey)) {
    throw new Error(
      "Invalid Firebase API key in .env. Verify VITE_FIREBASE_API_KEY is set to your Firebase project's API key."
    );
  }
}

validateFirebaseConfig(firebaseConfig);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
