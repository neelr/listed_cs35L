import {
  DynamoDBClient,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  CreateUserRequest,
  GetUserByIdRequest,
  GetUsersByNameRequest,
} from "../types";
import { client, getHashFromCurrentDate, usersTableName } from "./utils";

const docClient = DynamoDBDocumentClient.from(client);

export const createUser = async (user: CreateUserRequest) => {
  const item = {
    userId: getHashFromCurrentDate(),
    username: user.username,
    email: user.email,
    createdOn: new Date().toISOString(),
  };

  const command = new PutCommand({
    TableName: usersTableName,
    Item: item,
  });
  const response = await docClient.send(command);
  return { ...item, ...response };
};

export const getUsersByName = async ({ username }: GetUsersByNameRequest) => {
  // Define the scan parameters
  const params: ScanCommandInput = {
    TableName: usersTableName,
    FilterExpression: "#username = :username",
    ExpressionAttributeNames: {
      "#username": "username",
    },
    ExpressionAttributeValues: {
      ":username": { S: username },
    },
  };

  try {
    // Execute the scan command
    const command = new ScanCommand(params);
    const response = await client.send(command);

    // Return the matching items
    return response.Items;
  } catch (error) {
    console.error("Error scanning table:", error);
    throw new Error("Error scanning table");
  }
};

export const getUserById = async ({ userId }: GetUserByIdRequest) => {
  const command = new GetCommand({
    TableName: usersTableName,
    Key: {
      userId: userId,
    },
  });
  const response = await docClient.send(command);
  return response.Item;
};
