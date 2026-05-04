import { useState } from "react";
import { login, signup } from "../api/auth.api";
import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  SignupResponse,
} from "../types/auth.types";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (data: LoginRequest): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const res = await login(data);
      const result = res.data as AuthResponse;

      localStorage.setItem("token", result.access_token);

      return result;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (data: SignupRequest): Promise<SignupResponse> => {
    setLoading(true);
    try {
      const res = await signup(data);
      return res.data as SignupResponse;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleSignup, loading };
};
