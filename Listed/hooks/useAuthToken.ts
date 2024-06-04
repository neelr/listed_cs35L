import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

export const AUTH_TOKEN_QUERY_KEY = "authToken";

export const useAuthToken = () => {
  return useQuery({
    queryKey: [AUTH_TOKEN_QUERY_KEY],
    queryFn: async () => SecureStore.getItemAsync("token"),
  });
};
