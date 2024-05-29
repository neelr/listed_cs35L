import { API_DNS, API_PORT } from "../constants";
import { LoginPayload, LoginResponse } from "../types/types";
import axios from "axios";

export const login = async (payload: LoginPayload) => {
  const response = await axios.post<LoginResponse>(
    `http://${API_DNS}:${API_PORT}/sign-in`,
    payload
  );
  return response.data;
};
