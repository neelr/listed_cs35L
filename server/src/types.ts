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

export interface SearchUsersByNameRequest {
  username: string;
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
  userId: string;
  description?: string;
  completeBy?: string;
}

export interface GetTasksByUserIdRequest {
  userId: string;
}

export interface GetTasksByUserIdsRequest {
  userIds: string[];
}

export interface AddFriendRequest {
  userId: string;
  friendId: string;
}
export interface GetTaskByIdRequest {
  taskId: string;
}

export interface DeleteTaskRequest {
  taskId: string;
}

export interface PublicUser {
  userId: string;
  username: string;
  friends: string[];
}
