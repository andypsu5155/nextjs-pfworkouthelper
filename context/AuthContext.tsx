"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { User, onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext<{ user: User | null; logout: () => void }>({
  user: null,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
