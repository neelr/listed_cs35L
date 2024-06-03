import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { signup } from "../api/api";
import { ApiError, SignupPayload, LoginResponse } from "../types/authTypes";
import { LOGIN_MUTATION_KEY } from "./useLogin";

export const useSignup = (
  options?: UseMutationOptions<LoginResponse, ApiError, SignupPayload>
) => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, ApiError, SignupPayload>({
    mutationKey: [LOGIN_MUTATION_KEY],
    mutationFn: signup,
    onError: (error, variables, context) => {
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<LoginResponse>([LOGIN_MUTATION_KEY], data);
      alert(JSON.stringify(data));
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
