import { Request, Response } from "express";
import { GetTasksByUserIdsRequest } from "../types";
import { getTasksByUserIds } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  try {
    const request: GetTasksByUserIdsRequest = req.body;
    const tasks = await getTasksByUserIds(request);
    res.send(tasks);
  } catch (error) {
    console.error("Error getting tasks by user ids: ", error);
    res
      .status(500)
      .send({ message: "Error getting tasks by user ids", error: error });
  }
};
