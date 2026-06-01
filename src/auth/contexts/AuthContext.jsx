import {
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../../../firebase";
import { AuthContext } from "./AuthContextValue";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);

          const userDoc = await getDoc(
            doc(db, "users", currentUser.uid)
          );

          if (userDoc.exists()) {
            setUserInfo(userDoc.data());
          }
        } else {
          setUser(null);
          setUserInfo(null);
        }

        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
