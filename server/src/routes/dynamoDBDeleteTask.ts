import { Request, Response } from "express";
import { DeleteTaskRequest } from "../types";
import { deleteTask } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  const taskId: DeleteTaskRequest = req.body;
  const taskToBeDeleted = await deleteTask(taskId);
  res.send(taskToBeDeleted);
};
