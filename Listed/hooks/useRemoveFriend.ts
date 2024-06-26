import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { removeFriend } from "../api/api";
import { AxiosError } from "axios";
import { UserPrivate } from "../types/authTypes";
import { USER_FRIENDS_QUERY_KEY } from "./useUserFriends";
import { FRIEND_TASKS_QUERY_KEY } from "./useFriendTasks";
import { CURRENT_USER_QUERY_KEY } from "./useCurrentUser";

export const useRemoveFriend = (
  options?: UseMutationOptions<UserPrivate, AxiosError, string>
) => {
  const queryClient = useQueryClient();
  return useMutation<UserPrivate, AxiosError, string>({
    ...options,
    mutationFn: removeFriend,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [CURRENT_USER_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [USER_FRIENDS_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [FRIEND_TASKS_QUERY_KEY],
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};
