import {
  AUTH_ROUTE,
  FRIEND_ROUTE,
  HTTP_URL,
  TASK_ROUTE,
  USER_ROUTE,
} from "../constants";
import {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  UserPrivate,
} from "../types/authTypes";
import axios from "axios";
import { AddTaskRequest, Task, TaskChanges } from "../types/taskTypes";
import { User } from "../types/userTypes";
import { authClient } from "./authClient";

export const login = async (payload: LoginPayload) => {
  const response = await axios.post<LoginResponse>(
    `${HTTP_URL}/${AUTH_ROUTE}/sign-in`,
    payload
  );

  return response.data;
};

export const signup = async (payload: SignupPayload) => {
  const response = await axios.post<LoginResponse>(
    `${HTTP_URL}/${AUTH_ROUTE}/sign-up`,
    payload
  );
  return response.data;
};

export const getUserPrivate = async () => {
  const response = await authClient.get<UserPrivate>(`${USER_ROUTE}`);
  return response.data;
};

export const getUserTasks = async () => {
  const response = await authClient.get<Task[]>(`${USER_ROUTE}/${TASK_ROUTE}`);
  return response.data;
};

export const getUserFriends = async (friends: string[]) => {
  const response = await authClient.post<User[]>(`${FRIEND_ROUTE}/batch`, {
    userIds: friends,
  });
  return response.data;
};

export const getFriendTasks = async (friends: string[]) => {
  const response = await authClient.post<Task[]>(
    `${USER_ROUTE}/${TASK_ROUTE}`,
    {
      userIds: friends,
    }
  );
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await authClient.delete(`${TASK_ROUTE}/${taskId}`);

  return response.data;
};

export const deleteUser = async () => {
  const response = await authClient.delete(`${USER_ROUTE}`);
  return response.data;
};

export const editTask = async (changes: TaskChanges, taskId: string) => {
  const response = await authClient.put(`${TASK_ROUTE}/${taskId}`, changes);
  return response.data;
};

export const addTask = async (newTask: AddTaskRequest) => {
  const response = await authClient.post<Task>(`${TASK_ROUTE}`, newTask);
  return response.data;
};

export const searchForUsers = async (username: string) => {
  const response = await authClient.get<User[]>(
    `${USER_ROUTE}/search?username=${username}`
  );
  return response.data;
};

export const getUsernames = async () => {
  const response = await authClient.get<string[]>(`${USER_ROUTE}/usernames`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch usernames");
  }
  return response.data;
};
