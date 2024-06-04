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

export const useSignup = (
  options?: UseMutationOptions<LoginResponse, ApiError, SignupPayload>
) => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, ApiError, SignupPayload>({
    mutationFn: signup,
    onError: (error, variables, context) => {
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    onSuccess: async (data, variables, context) => {
      await SecureStore.setItemAsync("token", data.token);
      queryClient.setQueryData([CURRENT_USER_QUERY_KEY], data);
      queryClient.invalidateQueries({ queryKey: [AUTH_TOKEN_QUERY_KEY] });
      alert(JSON.stringify(data));
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
