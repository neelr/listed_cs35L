export interface Task {
  completed: boolean;
  createdOn: string;
  description: string;
  completeBy: string;
  taskId: string;
  userId: string;
  userIds: string[];
  name: string;
  private: boolean;
}

export type TaskChanges = Partial<Omit<Task, "taskId">>;
export interface TaskChangesRequest extends TaskChanges {
  taskId: string;
}

export interface GetUserTasksRequest {
  userId: string;
}

export interface AddTaskRequest {
  name: string;
  description?: string;
  completeBy?: string;
}
