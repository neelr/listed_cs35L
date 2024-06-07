import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { addFriend, removeFriend } from "../api/api";
import { AxiosError } from "axios";
import { UserPrivate } from "../types/authTypes";
import { USER_FRIENDS_QUERY_KEY } from "./useUserFriends";
import { FRIEND_TASKS_QUERY_KEY } from "./useFriendTasks";
import { CURRENT_USER_QUERY_KEY } from "./useCurrentUser";

export const useAddOrRemoveFriend = (
  isFriend: boolean,
  options?: UseMutationOptions<UserPrivate, AxiosError, string>
) => {
  const queryClient = useQueryClient();
  return useMutation<UserPrivate, AxiosError, string>({
    ...options,
    mutationFn: isFriend ? removeFriend : addFriend,
    onSuccess: (data, variables, context) => {
      queryClient.prefetchQuery({
        queryKey: [USER_FRIENDS_QUERY_KEY],
      });
      queryClient.prefetchQuery({
        queryKey: [FRIEND_TASKS_QUERY_KEY],
      });
      queryClient.prefetchQuery({
        queryKey: [CURRENT_USER_QUERY_KEY],
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};
