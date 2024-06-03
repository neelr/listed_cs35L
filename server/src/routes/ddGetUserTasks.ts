import { Request, Response } from "express";
import { GetUserTasksRequest } from "../types";
import { getTasksByUserIds } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  try {
    const request: GetUserTasksRequest = req.body;
    const tasks = await getTasksByUserIds({ userIds: [request.userId] });
    res.send(tasks);
  } catch (error) {
    console.error("Error getting user tasks: ", error);
    res.status(500).send({ message: "Error getting user tasks", error: error });
  }
};
