export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Task {
  id: string;
  name: string;
  userId: string;
  description: string;
  completed: boolean;
}

export interface GetUserIdByEmailRequest {
  email: string;
}

export interface GetUserByIdRequest {
  userId: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
}

export enum SignInErrors {
  USER_NOT_FOUND = "User not found",
  INCORRECT_PASSWORD = "Incorrect password",
}

export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
}

export interface DeleteUserRequest {
  userId: string;
}
export interface CreateTaskRequest {
  name: string;
  creatorId: string;
  description?: string;
  completeBy?: string;
}

export interface GetTasksByCreatorIdRequest {
  creatorId: string;
}

export interface GetTaskByIdRequest {
  taskId: string;
}

export interface DeleteTaskRequest {
  taskId: string;
}
