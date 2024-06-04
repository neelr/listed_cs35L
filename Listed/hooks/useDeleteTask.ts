import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/api";
import { ApiError } from "../types/authTypes";
import { USER_TASKS_QUERY_KEY } from "./useUserTasks";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: deleteTask,
    onSuccess: () => {
      // Invalidate and refetch the user tasks query after a task is deleted
      queryClient.invalidateQueries({ queryKey: [USER_TASKS_QUERY_KEY] });
    },
  });
};
