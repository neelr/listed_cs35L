import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { searchForUsers } from "../api/api";
import { LoginResponse } from "../types/authTypes";
import { User } from "../types/userTypes";

export const USER_SEARCH_QUERY_KEY = "userSearch";

export const useSearchUsers = (
  username: string,
  options?: UseQueryOptions<User[]>
) => {
  return useQuery<User[]>({
    ...options,
    queryKey: [USER_SEARCH_QUERY_KEY, username],
    queryFn: async () => {
      return searchForUsers(username);
    },
  });
};
