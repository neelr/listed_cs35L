export interface Task {
  taskId: string;
  name: string;
  userId: string;
  description: string;
  completed: boolean;
  completeBy: string;
  userIds: string[];
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

export interface GetUserTasksRequest {
  userId: string;
}

export interface GetTasksByUserIdsRequest {
  userIds: string[];
}

export interface GetFriendsDetailsRequest {
  userIds: string[];
}

export interface GetFriendDetailsRequest {
  userIds: string;
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

export type EditTaskRequest = Partial<Omit<Task, "taskId">>;

export type TaskFields = keyof Omit<Task, "taskId">;

export interface PublicUser {
  userId: string;
  username: string;
  friends: string[];
}
