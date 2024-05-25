import {
  CreateTaskRequest,
  DeleteTaskRequest,
  GetTaskByIdRequest,
  GetTasksByCreatorIdRequest,
} from "../types";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { getHashFromCurrentDate, client, tasksTableName } from "./utils";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import {
  DeleteItemCommand,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/client-dynamodb";

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

export const getTasksByCreatorId = async (
  creator: GetTasksByCreatorIdRequest
) => {
  const params: ScanCommandInput = {
    TableName: tasksTableName,
    FilterExpression: "#creatorId = :creatorId",
    ExpressionAttributeNames: {
      "#creatorId": "creatorId",
    },
    ExpressionAttributeValues: {
      ":creatorId": { S: creator.creatorId },
    },
  };
  try {
    const command = new ScanCommand(params);
    const response = await client.send(command);
    if (!response.Items) {
      return [];
    }
    return response.Items.map((item) => unmarshall(item));
  } catch (error) {
    console.error("Error scanning table: ", error);
    throw new Error("Error scanning table");
  }
};

export const getTaskById = async ({ taskId }: GetTaskByIdRequest) => {
  const command = new GetCommand({
    TableName: tasksTableName,
    Key: {
      taskId: taskId,
    },
  });

  const response = await client.send(command);
  return response.Item;
};

export const deleteTask = async ({ taskId }: DeleteTaskRequest) => {
  const command = new DeleteItemCommand({
    TableName: tasksTableName,
    Key: {
      taskId: { S: taskId },
    },
  });

  const response = await client.send(command);
  return { ...response, taskId: taskId };
};
