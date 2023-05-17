import React, { useContext, useState, useEffect } from "react";
import {
  auth,
  fetchUser
} from "../utils/firebase/firebase";

interface User {
  uid: string;
  name: string;

}

interface AuthContextProps {
  currentUser: User | null | undefined;
  logout: () => Promise<void>;

}

const AuthContext = React.createContext<AuthContextProps>({
  currentUser: undefined,
  logout: () => Promise.resolve(),
});

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();


  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        try {
          const userData = await fetchUser(userId);
          setCurrentUser(userData as User);
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      } else {
        setCurrentUser(null);
      }
    });
  
    return unsubscribe;
  }, []);
  
  const value: AuthContextProps = {
    currentUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
