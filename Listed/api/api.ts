import { HTTP_URL } from "../constants";
import {
  ApiError,
  LoginPayload,
  LoginResponse,
  SignupPayload,
} from "../types/authTypes";
import axios from "axios";

const getAuthHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const login = async (payload: LoginPayload) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${HTTP_URL}/sign-in`,
      payload
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      console.log(error.response?.data);
      throw error.response?.data;
    }
    throw error;
  }
};

export const signup = async (payload: SignupPayload) => {
  try {
    const response = await axios.post<LoginResponse>(
      `${HTTP_URL}/sign-up`,
      payload
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      console.log(error.response?.data);
      throw error.response?.data;
    }
    throw error;
  }
};

export const getUserTasks = async (token: string) => {
  try {
    const response = await axios.get(`${HTTP_URL}/tasks`, {
      ...getAuthHeader(token),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      console.log(error.response?.data);
      throw error.response?.data;
    }
    throw error;
  }
};

export const deleteTask = async (taskId: string, token: string) => {
  try {
    const response = await axios.delete(`${HTTP_URL}/task`, {
      ...getAuthHeader(token),
      data: { taskId },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw error.response?.data;
    }
    throw error;
  }
};
