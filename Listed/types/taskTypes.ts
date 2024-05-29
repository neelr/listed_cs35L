export interface Task {
  completed: boolean;
  createdOn: string;
  description: string;
  completeBy: string;
  taskId: string;
  userId: string;
  userIds: string[];
  name: string;
}

export interface GetUserTasksRequest {
  userId: string;
}
