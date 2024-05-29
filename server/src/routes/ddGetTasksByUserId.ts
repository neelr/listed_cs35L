import { Request, Response } from "express";
import { GetTasksByUserIdRequest } from "../types";
import { getTasksByUserId } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  try {
    const request: GetTasksByUserIdRequest = req.body;
    const tasks = await getTasksByUserId(request);
    res.send(tasks);
  } catch (error) {
    console.error("Error getting tasks by creator id: ", error);
    res
      .status(500)
      .send({ message: "Error getting tasks by creator id", error: error });
  }
};
