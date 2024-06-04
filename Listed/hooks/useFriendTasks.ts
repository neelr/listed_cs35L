import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getFriendTasks } from "../api/api";
import { User } from "../types/userTypes";
import { Task } from "../types/taskTypes";
import { USER_FRIENDS_QUERY_KEY } from "./useUserFriends";

export const FRIEND_TASKS_QUERY_KEY = "friendTasks";

export const useFriendTasks = (
  friends: string[],
  options?: UseQueryOptions<Task[]>
) => {
  return useQuery<Task[]>({
    ...options,
    queryKey: [FRIEND_TASKS_QUERY_KEY],
    queryFn: async () => {
      return await getFriendTasks(friends);
    },
    enabled: !!friends.length,
  });
};
