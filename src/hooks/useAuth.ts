import { useState } from "react";
import { login, signup } from "../api/auth.api";
import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  SignupResponse,
} from "../types/auth.types";
import { useAuthContext } from "@/context/auth.context";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuth } = useAuthContext();

  const handleLogin = async (data: LoginRequest): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const res = await login(data);
      const result = res.data as AuthResponse;
      console.log("res:", res);

      setAuth(result);

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
