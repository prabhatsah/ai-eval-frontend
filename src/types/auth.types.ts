import { Role } from "./user.types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface AuthResponse {
  access_token: string;
  user?: {
    id: string;
    email: string;
    role: Role;
  };
}

export interface TokenUserInfoResponse {
  userId: string;
  role: Role;
}
// export interface AuthResponse {
//   access_token: string;
// }

export interface SignupResponse {
  message: string;
}
