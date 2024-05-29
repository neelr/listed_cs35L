import { API_DNS, API_PORT } from "../constants";
import { LoginPayload, LoginResponse } from "../types/authTypes";
import axios from "axios";

const getAuthHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const login = async (payload: LoginPayload) => {
  const response = await axios.post<LoginResponse>(
    `http://${API_DNS}:${API_PORT}/sign-in`,
    payload
  );
  return response.data;
};

export const getUserTasks = async (token: string) => {
  const response = await axios.get(`http://${API_DNS}:${API_PORT}/tasks`, {
    ...getAuthHeader(token),
  });
  console.log(response.data);
  return response.data;
};
