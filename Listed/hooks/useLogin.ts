import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { login } from "../api/api";
import { ApiError, LoginPayload, LoginResponse } from "../types/types";
import { storeToken } from "../utils/storeTokens";

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, ApiError, LoginPayload>
) => {
  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: login,
    onError: (error, variables, context) => {
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    onSuccess: (data, variables, context) => {
      storeToken(data.token);
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
