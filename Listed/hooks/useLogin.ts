import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { login } from "../api/api";
import { ApiError, LoginPayload, LoginResponse } from "../types/authTypes";
import * as SecureStore from "expo-secure-store";
import { AUTH_TOKEN_QUERY_KEY } from "./useAuthToken";
import { CURRENT_USER_QUERY_KEY } from "./useCurrentUser";

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, ApiError, LoginPayload>
) => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: login,
    onError: (error, variables, context) => {
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    onSuccess: async (data, variables, context) => {
      await SecureStore.setItemAsync("token", data.token);
      queryClient.setQueryData([CURRENT_USER_QUERY_KEY], data);
      queryClient.invalidateQueries({ queryKey: [AUTH_TOKEN_QUERY_KEY] });
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
