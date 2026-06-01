import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../../firebase";

export const useAuth = () => {
  const register = async ({
    firstName,
    lastName,
    email,
    password,
  }) => {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = credential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      firstName,
      lastName,
      email,
      role: "user",
      createdAt: serverTimestamp(),
    });

    return user;
  };

  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return response;
  };

  const logout = async () => {
    await signOut(auth);
  };

  return {
    register,
    login,
    logout,
  };
};
