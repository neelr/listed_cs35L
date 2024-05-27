import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  GetCommand,
  DeleteCommand,
  ScanCommand,
  QueryCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  CreateUserRequest,
  GetUserByIdRequest,
  GetUserIdByEmailRequest,
  SignInErrors,
  SignInRequest,
} from "../types";
import { encryptPassword, getHashFromCurrentDate } from "./utils";
import { documentClient, USERS_TABLE_NAME } from "./constants";
import { SECRET_KEY } from "../server";

export const signIn = async ({ email, password }: SignInRequest) => {
  console.log("secret key", SECRET_KEY);
  try {
    const userResponse = await getUserIdByEmail({ email });
    if (userResponse.length === 0) {
      return { error: SignInErrors.USER_NOT_FOUND };
    }

    const user = await getUserById({ userId: userResponse[0].userId });

    if (!user) {
      return { error: SignInErrors.USER_NOT_FOUND };
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.userId }, SECRET_KEY, {
        expiresIn: "1h",
      });
      return { token: token, userId: user.userId };
    }
    return { error: SignInErrors.INCORRECT_PASSWORD };
  } catch (error) {
    console.error("Error getting user by email: ", error);
    throw new Error("Error getting user by email");
  }
};

export const getUserIdByEmail = async ({ email }: GetUserIdByEmailRequest) => {
  const command = new QueryCommand({
    TableName: USERS_TABLE_NAME,
    IndexName: "email-index",
    KeyConditionExpression: "#email = :email",
    ExpressionAttributeNames: {
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":email": email,
    },
  });

  try {
    const data = await documentClient.send(command);
    return data.Items || [];
  } catch (error) {
    console.error("Error getting user by email: ", error);
    throw new Error("Error getting user by email");
  }
};

export const createUser = async (user: CreateUserRequest) => {
  const encryptedPassword = await encryptPassword(user.password);

  try {
    const users = await getUserIdByEmail({ email: user.email });
    if (users.length > 0) {
      throw new Error("User already exists");
    }
  } catch (error) {
    console.error("Error checking if email exists: ", error);
    throw new Error("Error checking if email exists");
  }

  const item = {
    userId: getHashFromCurrentDate(),
    username: user.username,
    email: user.email,
    password: encryptedPassword,
    createdOn: new Date().toISOString(),
  };

  const command = new PutCommand({
    TableName: USERS_TABLE_NAME,
    Item: item,
  });

  try {
    await documentClient.send(command);
    return item;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw new Error("Error creating user");
  }
};

export const signUp = async (user: CreateUserRequest) => {
  try {
    await createUser(user);
    const signedInUser = await signIn({
      email: user.email,
      password: user.password,
    });
    return signedInUser;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw new Error("Error signing up");
  }
};

export const getUsersByName = async ({ email }: GetUserIdByEmailRequest) => {
  const params = {
    TableName: USERS_TABLE_NAME,
    FilterExpression: "#email = :email",
    ExpressionAttributeNames: {
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":email": email,
    },
  };

  try {
    const data = await documentClient.send(new ScanCommand(params));
    return data.Items || [];
  } catch (error) {
    console.error("Error scanning table: ", error);
    throw new Error("Error scanning table");
  }
};

export const getUserById = async ({ userId }: GetUserByIdRequest) => {
  const params = {
    TableName: USERS_TABLE_NAME,
    Key: {
      userId: userId,
    },
  };

  try {
    const data = await documentClient.send(new GetCommand(params));
    return data.Item || null;
  } catch (error) {
    console.error("Error getting user by ID: ", error);
    throw new Error("Error getting user by ID");
  }
};

export const deleteUser = async ({ userId }: GetUserByIdRequest) => {
  const params = {
    TableName: USERS_TABLE_NAME,
    Key: {
      userId: userId,
    },
  };

  const command = new DeleteCommand(params);

  try {
    await documentClient.send(command);
    return { message: "User deleted successfully", userId: userId };
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw new Error("Error deleting user");
  }
};
