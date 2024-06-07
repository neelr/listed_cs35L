import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteTask } from "../api/api";
import { ApiError } from "../types/authTypes";
import { USER_TASKS_QUERY_KEY } from "./useUserTasks";
import { AxiosError } from "axios";

export const useDeleteTask = (
  options?: UseMutationOptions<void, AxiosError<ApiError>, string>
) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, string>({
    ...options,
    mutationFn: deleteTask,
    onSuccess: () => {
      // Invalidate and refetch the user tasks query after a task is deleted
      queryClient.invalidateQueries({ queryKey: [USER_TASKS_QUERY_KEY] });
    },
  });
};
