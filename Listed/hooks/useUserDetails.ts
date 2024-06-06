import { AxiosError } from "axios";
import { User } from "../types/userTypes";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPublicUser } from "../api/api";

export const PUBLIC_USER_DETAILS_QUERY_KEY = "public-user-details";

export const useUserDetails = (
  userId: string,
  options?: UseQueryOptions<User, AxiosError>
) => {
  return useQuery<User, AxiosError>({
    queryKey: [PUBLIC_USER_DETAILS_QUERY_KEY, userId],
    queryFn: async () => getPublicUser(userId),
    ...options,
  });
};
