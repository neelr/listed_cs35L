import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { User } from "../types/userTypes";
import { getUserFriends } from "../api/api";

export const USER_FRIENDS_QUERY_KEY = "userFriends";

export const useUserFriends = (
  friends: string[],
  options?: UseQueryOptions<User[]>
) => {
  return useQuery<User[]>({
    ...options,
    queryKey: [USER_FRIENDS_QUERY_KEY],
    queryFn: async () => {
      return await getUserFriends(friends);
    },
    enabled: !!friends.length,
  });
};
