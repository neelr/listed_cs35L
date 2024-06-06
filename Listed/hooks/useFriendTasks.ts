import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getFriendTasks } from "../api/api";
import { Task } from "../types/taskTypes";

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
  });
};
