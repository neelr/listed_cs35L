import axios from "axios";
import * as Yup from "yup";

export const PASSWORD_SCHEMA = Yup.string()
  .required("Password is required")
  .matches(/[0-9]/, "Password must contain a number")
  .matches(/[a-z]/, "Password must contain a lowercase letter")
  .matches(/[A-Z]/, "Password must contain an uppercase letter")
  .matches(
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
    "Password must contain a special character"
  )
  .matches(/.{8,}/, "Password must contain at least 8 characters");

export const API_DNS = "ec2-35-95-43-181.us-west-2.compute.amazonaws.com";

export const HTTP_URL = `http://${API_DNS}`;

export const TASK_ROUTE = "task";
export const USER_ROUTE = "user";
export const AUTH_ROUTE = "auth";
export const FRIEND_ROUTE = "friend";

export const axiosClient = axios.create({
  baseURL: HTTP_URL,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      throw error.response?.data;
    }
    throw error;
  }
);
