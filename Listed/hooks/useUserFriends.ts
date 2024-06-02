import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { getUserTasks } from "../api/api";
import { Task } from "../types/taskTypes";
import { LOGIN_MUTATION_KEY } from "./useLogin";
import { LoginResponse } from "../types/authTypes";

export const USER_TASKS_QUERY_KEY = "userTasks";

// TODO: implement this. Currently behaves identically to useUserTasks.
export const useUserFriends = (options?: UseQueryOptions) => {
  const queryClient = useQueryClient();

  return useQuery<Task[]>({
    queryKey: [USER_TASKS_QUERY_KEY],
    queryFn: async () => {
      const token = queryClient.getQueryData<LoginResponse>([
        LOGIN_MUTATION_KEY,
      ]);
      if (!token) {
        throw new Error("No user data");
      }
      return getUserTasks(token.token);
    },
  });
};
