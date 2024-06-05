import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { addTask } from "../api/api";
import { ApiError } from "../types/authTypes";
import { USER_TASKS_QUERY_KEY } from "./useUserTasks";
import { AddTaskRequest, Task } from "../types/taskTypes";

export const useAddTask = (
  options?: UseMutationOptions<Task, ApiError, AddTaskRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation<Task, ApiError, AddTaskRequest>({
    ...options,
    mutationFn: addTask,
    onSuccess: (returnedTask, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [USER_TASKS_QUERY_KEY] });
      options?.onSuccess?.(returnedTask, variables, context);
    },
  });
};
