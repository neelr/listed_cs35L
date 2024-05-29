import {
  PutCommand,
  GetCommand,
  DeleteCommand,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";
import {
  CreateTaskRequest,
  DeleteTaskRequest,
  GetTaskByIdRequest,
  GetTasksByUserIdRequest,
  GetTasksByUserIdsRequest,
} from "../types";
import { getHashFromCurrentDate } from "./utils";
import { documentClient, TASKS_TABLE_NAME } from "./constants";

export const createTask = async (task: CreateTaskRequest) => {
  const item = {
    taskId: getHashFromCurrentDate(),
    userId: task.userId,
    name: task.name,
    description: task.description || null,
    completeBy: task.completeBy || null,
    created: new Date().toISOString(),
    completed: false,
    userIds: [task.userId],
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
    throw "Error creating task";
  }
};

export const getTasksByUserId = async (creator: GetTasksByUserIdRequest) => {
  const params = {
    TableName: TASKS_TABLE_NAME,
    FilterExpression: "#userId = :userId",
    ExpressionAttributeNames: {
      "#userId": "userId",
    },
    ExpressionAttributeValues: {
      ":userId": creator.userId,
    },
  };

  try {
    const { Items } = await documentClient.send(new ScanCommand(params));
    return Items || [];
  } catch (error) {
    console.error("Error scanning table: ", error);
    throw "Error scanning table";
  }
};

export const getTasksByUserIds = async ({
  userIds,
}: GetTasksByUserIdsRequest) => {
  let filterExpressions: string[] = [];
  let expressionAttributeValues: { [key: string]: string } = {};

  userIds.forEach((userId, index) => {
    const placeholder = `:userId${index}`;
    filterExpressions.push(`contains(userIds, ${placeholder})`);
    expressionAttributeValues[placeholder] = userId;
  });

  const params: ScanCommandInput = {
    TableName: TASKS_TABLE_NAME,
    FilterExpression: filterExpressions.join(" OR "),
    ExpressionAttributeValues: expressionAttributeValues,
  };

  try {
    const command = new ScanCommand(params);
    const response = await documentClient.send(command);
    return response.Items || [];
  } catch (error) {
    console.error("Error scanning table: ", error);
    throw "Error scanning table";
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
    throw "Error getting task by ID";
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
    throw "Error deleting task";
  }
};
