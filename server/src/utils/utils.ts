import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { createHash } from "crypto";

export const getHashFromCurrentDate = () => {
  const currentDate = new Date();
  return createHash("sha256").update(currentDate.toISOString()).digest("hex");
};

export const client = new DynamoDBClient({ region: "us-west-2" });
export const usersTableName = "listed-users-test";
export const tasksTableName = "listed-tasks-test";
