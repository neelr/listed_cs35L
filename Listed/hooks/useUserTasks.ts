import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getUserTasks } from "../api/api";
import { Task } from "../types/taskTypes";

export const USER_TASKS_QUERY_KEY = "userTasks";

export const useUserTasks = (options?: UseQueryOptions<Task[]>) => {
  return useQuery<Task[]>({
    ...options,
    queryKey: [USER_TASKS_QUERY_KEY],
    queryFn: getUserTasks,
  });
};
