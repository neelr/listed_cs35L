import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
export const documentClient = DynamoDBDocumentClient.from(client);

export const USERS_TABLE_NAME = "listed-users-test";
export const TASKS_TABLE_NAME = "listed-tasks-test";

export const SECRET_KEY = process.env.AUTH_SECRET || "test-secret";

export const JWT_EXPIRATION = "1h";
