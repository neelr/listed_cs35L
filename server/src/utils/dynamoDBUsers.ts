import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  GetCommand,
  DeleteCommand,
  ScanCommand,
  QueryCommand,
  PutCommand,
  UpdateCommand,
  BatchGetCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  CreateUserRequest,
  GetFriendsDetailsRequest,
  GetUserByIdRequest,
  GetUserIdByEmailRequest,
  SearchUsersByNameRequest,
  SignInErrors,
  SignInRequest,
} from "../types";
import {
  encryptPassword,
  getHashFromCurrentDate,
  omitSensitiveKeys,
} from "./utils";
import { documentClient, USERS_TABLE_NAME } from "./constants";
import { SECRET_KEY } from "../server";
import { AddFriendRequest } from "../types";
import { ReturnValue } from "@aws-sdk/client-dynamodb";

export const signIn = async ({ email, password }: SignInRequest) => {
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
      return { token: token, ...user };
    }
    return { error: SignInErrors.INCORRECT_PASSWORD };
  } catch (error) {
    console.error("Error getting user by email: ", error);
    throw "Error getting user by email";
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
    throw "Error getting user by email";
  }
};

export const createUser = async (user: CreateUserRequest) => {
  const encryptedPassword = await encryptPassword(user.password);

  try {
    const users = await getUserIdByEmail({ email: user.email });
    if (users.length > 0) {
      throw "Email is taken";
    }
  } catch (error) {
    console.error("Error checking if email exists: ", error);
    throw error;
  }

  const item = {
    userId: getHashFromCurrentDate(),
    username: user.username,
    email: user.email,
    password: encryptedPassword,
    createdOn: new Date().toISOString(),
    friends: [],
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
    throw "Error creating user";
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
    throw error;
  }
};

export const searchUsers = async ({ username }: SearchUsersByNameRequest) => {
  const params = {
    TableName: USERS_TABLE_NAME,
    FilterExpression: "contains(#username, :searchTerm)",
    ExpressionAttributeNames: {
      "#username": "username",
    },
    ExpressionAttributeValues: {
      ":searchTerm": username,
    },
  };

  try {
    const data = await documentClient.send(new ScanCommand(params));
    return data.Items?.map((user) => omitSensitiveKeys(user)) || [];
  } catch (error) {
    console.error("Error scanning table: ", error);
    throw "Error scanning table";
  }
};

export const getAllUsers = async () => {
  const params = {
    TableName: USERS_TABLE_NAME,
  };

  try {
    const data = await documentClient.send(new ScanCommand(params));
    return data.Items?.map((user) => omitSensitiveKeys(user)) || [];
  } catch (error) {
    console.error("Error scanning table: ", error);
    throw "Error scanning table";
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
    if (!data.Item) {
      throw "User not found";
    }
    return data.Item;
  } catch (error) {
    console.error("Error getting user by ID: ", error);
    throw "Error getting user by ID";
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
    throw "Error deleting user";
  }
};

export const addFriend = async ({ userId, friendId }: AddFriendRequest) => {
  const user = await getUserById({ userId });
  if (!user) {
    throw "User not found";
  }

  if (user.friends.includes(friendId)) {
    throw "Friend already added";
  }
  if (userId === friendId) {
    throw "Cannot add self as friend";
  }

  const params = {
    TableName: USERS_TABLE_NAME,
    Key: {
      userId: userId,
    },
    UpdateExpression: "SET friends = list_append(friends, :friendId)",
    ExpressionAttributeValues: {
      ":friendId": [friendId],
    },
    ReturnValues: ReturnValue.ALL_NEW,
  };

  const command = new UpdateCommand(params);

  try {
    const data = await documentClient.send(command);
    return data.Attributes;
  } catch (error) {
    console.error("Error adding friend: ", error);
    throw "Error adding friend";
  }
};

export const removeFriend = async ({ userId, friendId }: AddFriendRequest) => {
  const user = await getUserById({ userId });
  if (!user) {
    throw "User not found";
  }

  if (!user.friends.includes(friendId)) {
    throw "Friend not found";
  }

  const newFriends = user.friends?.filter((id: string) => id !== friendId);

  const params = {
    TableName: USERS_TABLE_NAME,
    Key: {
      userId: userId,
    },
    UpdateExpression: "SET friends = :newFriends",
    ExpressionAttributeValues: {
      ":newFriends": newFriends,
    },
    ReturnValues: ReturnValue.ALL_NEW,
  };

  const command = new UpdateCommand(params);

  try {
    const data = await documentClient.send(command);
    return data.Attributes;
  } catch (error) {
    console.error("Error removing friend: ", error);
    throw "Error removing friend";
  }
};

export const getFriendsDetails = async ({
  userIds,
}: GetFriendsDetailsRequest) => {
  const keys = userIds.map((userId) => ({ userId }));

  const params = {
    RequestItems: {
      [USERS_TABLE_NAME]: {
        Keys: keys,
      },
    },
  };

  try {
    const { Responses } = await documentClient.send(
      new BatchGetCommand(params)
    );
    const friends = Responses?.[USERS_TABLE_NAME] || [];
    const sanitizedFriends = friends.map((friend) => omitSensitiveKeys(friend));

    return sanitizedFriends;
  } catch (error) {
    console.error("Error getting friend details: ", error);
    throw "Error getting friend details";
  }
};
