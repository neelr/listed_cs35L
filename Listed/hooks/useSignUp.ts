import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { signup } from "../api/api";
import { ApiError, SignupPayload, LoginResponse } from "../types/authTypes";
import * as SecureStore from "expo-secure-store";
import { CURRENT_USER_QUERY_KEY } from "./useCurrentUser";
import { AUTH_TOKEN_QUERY_KEY } from "./useAuthToken";
import { AxiosError } from "axios";

export const useSignup = (
  options?: UseMutationOptions<
    LoginResponse,
    AxiosError<ApiError> & ApiError,
    SignupPayload
  >
) => {
  const queryClient = useQueryClient();
  return useMutation<
    LoginResponse,
    AxiosError<ApiError> & ApiError,
    SignupPayload
  >({
    mutationFn: signup,
    ...options,
    onSuccess: async (data, variables, context) => {
      await SecureStore.setItemAsync("token", data.token);
      queryClient.setQueryData([CURRENT_USER_QUERY_KEY], data);
      queryClient.invalidateQueries({ queryKey: [AUTH_TOKEN_QUERY_KEY] });
      options?.onSuccess?.(data, variables, context);
    },
  });
};
