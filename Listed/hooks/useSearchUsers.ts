import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { searchForUsers } from "../api/api";
import { LOGIN_MUTATION_KEY } from "./useLogin";
import { LoginResponse } from "../types/authTypes";
import { User } from "../types/userTypes";

export const USER_SEARCH_QUERY_KEY = "userSearch";

export const useSearchUsers = (
  username: string,
  options?: UseQueryOptions<User[]>
) => {
  const queryClient = useQueryClient();

  return useQuery<User[]>({
    ...options,
    queryKey: [USER_SEARCH_QUERY_KEY, username],
    queryFn: async () => {
      const token = queryClient.getQueryData<LoginResponse>([
        LOGIN_MUTATION_KEY,
      ]);
      if (!token) {
        throw new Error("No user data");
      }
      const result = searchForUsers(username, token.token);

      alert(JSON.stringify(result));
      return result;
    },
    enabled: !!username,
  });
};
