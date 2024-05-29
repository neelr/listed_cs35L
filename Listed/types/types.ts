export interface User {
  username: string;
  email: string;
  friends: string[];
  createdOn: string;
  userId: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserPrivate extends User {
  password: string;
}

export interface LoginResponse extends UserPrivate {
  token: string;
}

export interface ApiError {
  error: string;
  message: string;
}
