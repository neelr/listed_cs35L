import { Request, Response } from "express";
import { GetTasksByCreatorIdRequest } from "../types";
import { getTasksByCreatorId } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  const request: GetTasksByCreatorIdRequest = req.body;
  const tasks = await getTasksByCreatorId(request);
  res.send(tasks);
};
