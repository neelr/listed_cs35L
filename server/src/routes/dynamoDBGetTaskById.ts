import { Request, Response } from "express";
import { GetTaskByIdRequest } from "../types";
import { getTaskById } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  const taskId: GetTaskByIdRequest = req.body;
  const newTask = await getTaskById(taskId);
  res.send(newTask);
};
