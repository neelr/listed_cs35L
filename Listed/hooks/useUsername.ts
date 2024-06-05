import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getUsernames } from "../api/api";
import { ApiError } from "../types/authTypes";

export const USERNAMES_QUERY_KEY = "usernames";

export const useUsernames = (
  options?: UseQueryOptions<string[], ApiError>
) => {
  return useQuery<string[], ApiError>({
    queryKey: [USERNAMES_QUERY_KEY],
    queryFn: getUsernames,
    ...options,
  });
};
