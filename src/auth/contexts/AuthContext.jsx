import {
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

import { auth, db } from "../../../firebase/config";
import { AuthContext } from "./AuthContextValue";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubSnapshot = null;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);

          const userRef = doc(db, "users", currentUser.uid);
          if (unsubSnapshot) unsubSnapshot();
          unsubSnapshot = onSnapshot(userRef, (snapshot) => {
            setUserInfo(snapshot.exists() ? snapshot.data() : null);
          });
        } else {
          setUser(null);
          setUserInfo(null);
          if (unsubSnapshot) {
            unsubSnapshot();
            unsubSnapshot = null;
          }
        }
      } finally {
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      if (unsubSnapshot) unsubSnapshot();
    };
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
