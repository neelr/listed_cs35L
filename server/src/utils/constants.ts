import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
export const documentClient = DynamoDBDocumentClient.from(client);

export const USERS_TABLE_NAME = "listed-users-test";
export const TASKS_TABLE_NAME = "listed-tasks-test";

export const TASK_ROUTE = "task";
export const USER_ROUTE = "user";
export const AUTH_ROUTE = "auth";
export const FRIEND_ROUTE = "friend";

export const SENSITIVE_KEYS = ["password", "email"];

export const JWT_EXPIRATION = "1h";
