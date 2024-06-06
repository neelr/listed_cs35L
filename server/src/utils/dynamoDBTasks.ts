import {
  PutCommand,
  GetCommand,
  DeleteCommand,
  ScanCommand,
  ScanCommandInput,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  CreateTaskRequest,
  EditTaskRequest,
  GetPublicTasksByUserIdsRequest,
  TaskFields,
} from "../types";
import { getHashFromCurrentDate } from "./utils";
import { documentClient, TASKS_TABLE_NAME } from "./constants";
import { ReturnValue } from "@aws-sdk/client-dynamodb";

export const createTask = async (task: CreateTaskRequest) => {
  const item = {
    taskId: getHashFromCurrentDate(),
    userId: task.userId,
    name: task.name,
    private: task.private,
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

export const getTasksByUserIds = async ({
  userIds,
}: GetPublicTasksByUserIdsRequest) => {
  if (!userIds || userIds.length === 0) return [];

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

export const getTasksByCreatorId = async (userId: string) => {
  const params = {
    TableName: TASKS_TABLE_NAME,
    FilterExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
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

export const getTaskById = async (taskId: string) => {
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

export const deleteTask = async (taskId: string) => {
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

export const editTask = async (taskId: string, task: EditTaskRequest) => {
  const allowedFields: TaskFields[] = [
    "name",
    "description",
    "completeBy",
    "completed",
    "userId",
    "userIds",
    "private",
  ];

  let updateExpression = "SET";
  const ExpressionAttributeValues: { [key: string]: any } = {};
  const ExpressionAttributeNames: { [key: string]: string } = {};

  let first = true;
  for (const key of allowedFields) {
    if (key in task) {
      if (!first) {
        updateExpression += ",";
      }
      updateExpression += ` #${key} = :${key}`;
      ExpressionAttributeNames[`#${key}`] = key;
      ExpressionAttributeValues[`:${key}`] = task[key];
      first = false;
    }
  }

  const params = {
    TableName: TASKS_TABLE_NAME,
    Key: { taskId },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: ReturnValue.ALL_NEW,
  };

  try {
    const { Attributes } = await documentClient.send(new UpdateCommand(params));
    return Attributes;
  } catch (error) {
    console.error("Error updating task: ", error);
    throw "Error updating task";
  }
};
