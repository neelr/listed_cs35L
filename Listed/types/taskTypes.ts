export interface Task {
  private: boolean;
  completed: boolean;
  createdOn: string;
  description: string;
  completeBy: string;
  taskId: string;
  userId: string;
  userIds: string[];
  name: string;
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
  private: boolean;
  description?: string;
  completeBy?: string;
}
