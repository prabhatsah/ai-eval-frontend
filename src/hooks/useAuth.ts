import { useState } from "react";
import { login, signup, userInfo } from "../api/auth.api";
import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  SignupResponse,
  TokenUserInfoResponse,
} from "../types/auth.types";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (data: LoginRequest) => {
    setLoading(true);
    try {
      await login(data);
    } finally {
      setLoading(false);
    }
  };

  const getUserInfo = async (): Promise<TokenUserInfoResponse> => {
    try {
      const res = await userInfo();
      const result = res.data as TokenUserInfoResponse;
      return result;
    } catch (error) {
      console.log("error-->>>", error);
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

  return { handleLogin, handleSignup, loading, getUserInfo };
};
