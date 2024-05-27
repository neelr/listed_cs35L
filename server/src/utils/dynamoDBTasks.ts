import {
  PutCommand,
  GetCommand,
  DeleteCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  CreateTaskRequest,
  DeleteTaskRequest,
  GetTaskByIdRequest,
  GetTasksByCreatorIdRequest,
} from "../types";
import { getHashFromCurrentDate } from "./utils";
import { documentClient, TASKS_TABLE_NAME } from "./constants";

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
    TableName: TASKS_TABLE_NAME,
    Item: item,
  });

  try {
    await documentClient.send(command);
    return item;
  } catch (error) {
    console.error("Error creating task: ", error);
    throw new Error("Error creating task");
  }
};

export const getTasksByCreatorId = async (
  creator: GetTasksByCreatorIdRequest
) => {
  const params = {
    TableName: TASKS_TABLE_NAME,
    FilterExpression: "#creatorId = :creatorId",
    ExpressionAttributeNames: {
      "#creatorId": "creatorId",
    },
    ExpressionAttributeValues: {
      ":creatorId": creator.creatorId,
    },
  };

  try {
    const { Items } = await documentClient.send(new ScanCommand(params));
    return Items || [];
  } catch (error) {
    console.error("Error scanning table: ", error);
    throw new Error("Error scanning table");
  }
};

export const getTaskById = async ({ taskId }: GetTaskByIdRequest) => {
  const params = {
    TableName: TASKS_TABLE_NAME,
    Key: {
      taskId: taskId,
    },
  };

  try {
    const { Item } = await documentClient.send(new GetCommand(params));
    return Item || null;
  } catch (error) {
    console.error("Error getting task by ID: ", error);
    throw new Error("Error getting task by ID");
  }
};

export const deleteTask = async ({ taskId }: DeleteTaskRequest) => {
  const params = {
    TableName: TASKS_TABLE_NAME,
    Key: {
      taskId: taskId,
    },
  };

  const command = new DeleteCommand(params);

  try {
    await documentClient.send(command);
    return { taskId: taskId };
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw new Error("Error deleting task");
  }
};
