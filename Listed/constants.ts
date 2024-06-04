import * as Yup from 'yup';

export const PASSWORD_SCHEMA = Yup.string()
  .required('Password is required')
  .test('password-complexity', 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character', function (value) {
    if (!value) return false;

    const errors = [];
    if (!/[0-9]/.test(value)) {
      errors.push('Password must contain a number');
    }
    if (!/[a-z]/.test(value)) {
      errors.push('Password must contain a lowercase letter');
    }
    if (!/[A-Z]/.test(value)) {
      errors.push('Password must contain an uppercase letter');
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
      errors.push('Password must contain a special character');
    }
    if (value.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    return errors.length > 0 ? this.createError({ message: errors.join(', ') }) : true;
  });


export const API_DNS = "ec2-35-95-43-181.us-west-2.compute.amazonaws.com";

export const HTTP_URL = `http://${API_DNS}`;

export const TASK_ROUTE = "task";
export const USER_ROUTE = "user";
export const AUTH_ROUTE = "auth";
export const FRIEND_ROUTE = "friend";
