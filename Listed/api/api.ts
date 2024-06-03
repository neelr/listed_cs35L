import { HTTP_URL } from "../constants";
import { LoginPayload, LoginResponse, SignupPayload } from "../types/authTypes";
import axios from "axios";
import { Task } from "../types/taskTypes";
import { User } from "../types/userTypes";

const getAuthHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const login = async (payload: LoginPayload) => {
  const response = await axios.post<LoginResponse>(
    `${HTTP_URL}/sign-in`,
    payload
  );
  return response.data;
};

export const signup = async (payload: SignupPayload) => {
  const response = await axios.post<LoginResponse>(
    `${HTTP_URL}/sign-up`,
    payload
  );
  return response.data;
};

export const getUserTasks = async (token: string) => {
  const response = await axios.get<Task[]>(`${HTTP_URL}/tasks`, {
    ...getAuthHeader(token),
  });
  return response.data;
};

export const deleteTask = async (taskId: string, token: string) => {
  const response = await axios.delete(`${HTTP_URL}/task`, {
    ...getAuthHeader(token),
    data: { taskId },
  });

  return response.data;
};

export const searchForUsers = async (username: string, token: string) => {
  const response = await axios.get<User[]>(`${HTTP_URL}/users`, {
    ...getAuthHeader(token),
    data: { username },
  });
  return response.data;
};
