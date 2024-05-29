import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getUserTasks } from "../api/api";
import { getToken } from "../utils/storeTokens";
import { Task } from "../types/taskTypes";

export const USER_TASKS_QUERY_KEY = "userTasks";

export const useUserTasks = (options?: UseQueryOptions) => {
  return useQuery<Task[]>({
    queryKey: [USER_TASKS_QUERY_KEY],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token found");
      }
      return getUserTasks(token);
    },
  });
};
