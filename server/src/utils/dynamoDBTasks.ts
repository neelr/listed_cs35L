import { CreateTaskRequest } from "../types";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { getHashFromCurrentDate, client, tasksTableName } from "./utils";

export const createTask = async (task: CreateTaskRequest) => {
  const item = {
    taskId: getHashFromCurrentDate(),
    creatorId: task.creatorId,
    name: task.name,
    description: task.description || null,
    completeBy: task.completeBy || null,
    created: new Date().toISOString(),
    completed: false,
    userIds: [task.creatorId],
  };

  const command = new PutCommand({
    TableName: tasksTableName,
    Item: item,
  });

  const response = await client.send(command);
  return { ...item, ...response };
};
