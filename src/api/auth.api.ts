import { apiClient } from "./client";
import { Role } from "../types/user.types";
import { AuthResponse } from "../types/auth.types";

export const signup = async (data: { name: string; email: string; password: string; role: Role }) => {
  return apiClient.post<{ message: string }>("/auth/signup", data);
};

export const login = async (data: { email: string; password: string }) => {
  return apiClient.post<AuthResponse>("/auth/login", data);
};
