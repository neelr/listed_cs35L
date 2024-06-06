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
import { AxiosError } from "axios";

export const useLogin = (
  options?: UseMutationOptions<
    LoginResponse,
    AxiosError<ApiError>,
    LoginPayload
  >
) => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, AxiosError<ApiError>, LoginPayload>({
    ...options,
    mutationFn: login,
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
