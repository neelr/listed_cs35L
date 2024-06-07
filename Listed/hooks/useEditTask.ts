import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { editTask } from "../api/api";
import { ApiError } from "../types/authTypes";
import { USER_TASKS_QUERY_KEY } from "./useUserTasks";
import { Task, TaskChanges, TaskChangesRequest } from "../types/taskTypes";
import { FRIEND_TASKS_QUERY_KEY } from "./useFriendTasks";
import { AxiosError } from "axios";

export const useEditTask = (
  options?: UseMutationOptions<Task, AxiosError<ApiError>, TaskChangesRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation<Task, AxiosError<ApiError>, TaskChangesRequest>({
    ...options,
    mutationFn: async (task) => {
      const changes: TaskChanges = { ...task };
      return editTask(changes, task.taskId);
    },
    onSuccess: (returnedTask, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [USER_TASKS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [FRIEND_TASKS_QUERY_KEY] });
      options?.onSuccess?.(returnedTask, variables, context);
    },
  });
};
