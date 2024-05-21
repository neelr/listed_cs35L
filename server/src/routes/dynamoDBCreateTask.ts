import { Request, Response } from "express";
import { CreateTaskRequest } from "../types";
import { createTask } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  const taskInfo: CreateTaskRequest = req.body;
  const newTask = await createTask(taskInfo);
  res.send(newTask);
};
