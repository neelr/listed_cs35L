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
