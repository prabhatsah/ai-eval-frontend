"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { setAccessToken as setAxiosToken } from "../api/tokenService";
import { Role } from "@/types/user.types";
import { AuthResponse } from "@/types/auth.types";
import { refreshToken } from "@/api/auth.api";

type AuthContextType = {
  user: AuthResponse["user"] | null;
  setUser: (user: AuthResponse["user"] | null) => void;
  clearAuth: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await getMe(); // FIRST try access token
        setUser(res.data);
      } catch {
        try {
          await refreshToken(); // only if needed
          const res = await getMe();
          setUser(res.data);
        } catch {
          setUser(null);
        }
      }
    };

    restoreSession();
  }, []);

  const clearAuth = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, clearAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext not found");
  return ctx;
};
