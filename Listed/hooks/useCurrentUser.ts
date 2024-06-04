import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UserPrivate } from "../types/authTypes";
import { getUserPrivate } from "../api/api";

export const [CURRENT_USER_QUERY_KEY] = "currentUser";

export const useCurrentUser = (options?: UseQueryOptions<UserPrivate>) => {
  return useQuery<UserPrivate>({
    ...options,
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: getUserPrivate,
  });
};
