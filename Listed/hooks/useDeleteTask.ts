import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/api";
import { ApiError } from "../types/authTypes";
import { LOGIN_MUTATION_KEY } from "./useLogin";
import { LoginResponse } from "../types/authTypes";



export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>((taskId) => {
    const token = queryClient.getQueryData<LoginResponse>([
        LOGIN_MUTATION_KEY,
      ]);    if (!token) {
      throw new Error("Invalid token");
    }
    return deleteTask(taskId, token);
  });
};
