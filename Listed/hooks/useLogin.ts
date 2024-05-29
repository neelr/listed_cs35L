import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { login } from "../api/api";
import { ApiError, LoginPayload, LoginResponse } from "../types/authTypes";

export const LOGIN_MUTATION_KEY = "login";

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, ApiError, LoginPayload>
) => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationKey: [LOGIN_MUTATION_KEY],
    mutationFn: login,
    onError: (error, variables, context) => {
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<LoginResponse>([LOGIN_MUTATION_KEY], data);
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
