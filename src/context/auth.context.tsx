"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { setAccessToken as setAxiosToken } from "../api/tokenService";
import { Role } from "@/types/user.types";
import { AuthResponse } from "@/types/auth.types";
import { refreshToken } from "@/api/auth.api";

// type AuthState = {
//   accessToken: string | null;
//   user: {
//     id: string;
//     email: string;
//     role: Role;
//   } | null;
// };

type AuthContextType = {
  accessToken: string | null;
  user: AuthResponse["user"] | null;
  setAuth: (data: AuthResponse) => void;
  clearAuth: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAxiosToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await refreshToken();
        const data = res.data;

        setAccessToken(data.access_token);
        setUser(data.user || null);
      } catch (err) {
        // silently fail (user not logged in)
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const setAuth = (data: AuthResponse) => {
    setAccessToken(data.access_token);
    setUser(data.user || null);
  };

  const clearAuth = () => {
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, user, setAuth, clearAuth, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext not found");
  return ctx;
};
