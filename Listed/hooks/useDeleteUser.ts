import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteUser } from "../api/api";
import { ApiError } from "../types/authTypes";

export const useDeleteUser = (
  options?: UseMutationOptions<void, ApiError, void>
) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    ...options,
    mutationFn: deleteUser,
  });
};
