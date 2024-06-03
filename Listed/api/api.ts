import {
  AUTH_ROUTE,
  axiosClient,
  HTTP_URL,
  TASK_ROUTE,
  USER_ROUTE,
} from "../constants";
import { LoginPayload, LoginResponse, SignupPayload } from "../types/authTypes";
import axios from "axios";
import qs from "qs";
import { Task } from "../types/taskTypes";
import { User } from "../types/userTypes";

const getAuthHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const login = async (payload: LoginPayload) => {
  const response = await axios.post<LoginResponse>(
    `${HTTP_URL}/${AUTH_ROUTE}/sign-in`,
    payload
  );

  if (response.status !== 200) {
    throw new Error(response.data.error);
  }

  return response.data;
};

export const signup = async (payload: SignupPayload) => {
  const response = await axios.post<LoginResponse>(
    `${HTTP_URL}/${AUTH_ROUTE}/sign-up`,
    payload
  );

  if (response.status !== 200) {
    throw new Error(response.data.error);
  }

  return response.data;
};

export const getUserTasks = async (token: string) => {
  const response = await axiosClient.get<Task[]>(
    `${HTTP_URL}/${USER_ROUTE}/${TASK_ROUTE}`,
    {
      ...getAuthHeader(token),
    }
  );
  return response.data;
};

export const deleteTask = async (taskId: string, token: string) => {
  const response = await axiosClient.delete(
    `${HTTP_URL}/${TASK_ROUTE}/${taskId}`,
    {
      ...getAuthHeader(token),
    }
  );

  return response.data;
};

export const searchForUsers = async (username: string, token: string) => {
  const response = await axiosClient.get<User[]>(
    `${HTTP_URL}/${USER_ROUTE}/search?${qs.stringify({ username })}`,
    {
      ...getAuthHeader(token),
    }
  );
  return response.data;
};
