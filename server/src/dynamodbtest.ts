import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: "us-west-2" });
const tableName = "listed-users";

const docClient = DynamoDBDocumentClient.from(client);

interface CreateUserPayload {
  name: string;
  userID?: number;
}

interface GetUserPayload {
  userID: number;
}

export const createUser = async (user: CreateUserPayload) => {
  const command = new PutCommand({
    TableName: tableName,
    Item: {
      userID: user.userID || Math.floor(Math.random() * 1000000),
      name: user.name,
    },
  });
  const response = await docClient.send(command);
  return response;
};

export const getUser = async (user: GetUserPayload) => {
  const command = new GetCommand({
    TableName: tableName,
    Key: {
      userID: user.userID,
    },
  });

  const response = await docClient.send(command);
  return response.Item;
};
