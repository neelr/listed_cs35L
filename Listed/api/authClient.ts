import axios from "axios";
import { HTTP_URL } from "../constants";
import * as SecureStore from "expo-secure-store";

export const authClient = axios.create({
  baseURL: HTTP_URL,
});

authClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw error.response?.data;
    }
    throw error;
  }
);
