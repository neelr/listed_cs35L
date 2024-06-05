import { Request, Response } from "express";
import { GetPublicTasksByUserIdsRequest } from "../types";
import { getTasksByUserIds } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  try {
    const request: GetPublicTasksByUserIdsRequest = req.body;
    const tasks = await getTasksByUserIds(request);
    const publicTasks = tasks.filter((task) => !task.private);
    res.send(publicTasks);
  } catch (error) {
    console.error("Error getting tasks by user ids: ", error);
    res
      .status(500)
      .send({ message: "Error getting tasks by user ids", error: error });
  }
};
