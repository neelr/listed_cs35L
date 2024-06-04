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
    mutationFn: addTask,
    onSuccess: (returnedTask, variables, context) => {
      const currentTasks = queryClient.getQueryData<Task[]>([
        USER_TASKS_QUERY_KEY,
      ]);
      queryClient.setQueryData([USER_TASKS_QUERY_KEY], {
        ...currentTasks,
        returnedTask,
      });
      options?.onSuccess?.(returnedTask, variables, context);
    },
  });
};
