import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { editTask } from "../api/api";
import { ApiError } from "../types/authTypes";
import { USER_TASKS_QUERY_KEY } from "./useUserTasks";
import { Task, TaskChanges, TaskChangesRequest } from "../types/taskTypes";

export const useEditTask = (
  options?: UseMutationOptions<Task, ApiError, TaskChangesRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation<Task, ApiError, TaskChangesRequest>({
    ...options,
    mutationFn: async (task) => {
      const changes: TaskChanges = { ...task };
      return editTask(changes, task.taskId);
    },
    onSuccess: (returnedTask, variables, context) => {
      const currentTasks = queryClient.getQueryData<Task[]>([
        USER_TASKS_QUERY_KEY,
      ]);
      const newTasks = currentTasks?.map((task) => {
        if (task.taskId === returnedTask.taskId) {
          return returnedTask;
        }
        return task;
      });

      queryClient.setQueryData([USER_TASKS_QUERY_KEY], newTasks);
      options?.onSuccess?.(returnedTask, variables, context);
    },
  });
};
