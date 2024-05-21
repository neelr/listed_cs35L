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

export interface GetUsersByNameRequest {
  username: string;
}

export interface GetUserByIdRequest {
  userId: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
}

export interface CreateTaskRequest {
  name: string;
  creatorId: string;
  description?: string;
  completeBy?: string;
}
