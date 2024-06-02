import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/api";
import { ApiError } from "../types/authTypes";
import { LOGIN_MUTATION_KEY } from "./useLogin";
import { LoginResponse } from "../types/authTypes";
import { USER_TASKS_QUERY_KEY } from "./useUserTasks"; 


export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: async (taskId) => {
      const token = queryClient.getQueryData<LoginResponse>([
        LOGIN_MUTATION_KEY,
      ]);
      if (!token) {
        throw new Error("Invalid token");
      }
      return deleteTask(taskId, token.token);
    },
    
  });
};
