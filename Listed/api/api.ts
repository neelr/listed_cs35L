import { API_DNS, API_PORT } from "../constants";
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
      `http://${API_DNS}:${API_PORT}/sign-in`,
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
      `http://${API_DNS}:${API_PORT}/sign-up`,
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
  const response = await axios.get(`http://${API_DNS}:${API_PORT}/tasks`, {
    ...getAuthHeader(token),
  });
  return response.data;
};
