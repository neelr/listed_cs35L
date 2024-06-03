import { User } from "./userTypes";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface UserPrivate extends User {
  password: string;
}

export interface LoginResponse extends UserPrivate {
  token: string;
  message?: string;
  error?: string;
}

export interface ApiError {
  error: string;
  message: string;
}
