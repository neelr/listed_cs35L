import { Request, Response } from "express";
import { GetTasksByCreatorIdRequest } from "../types";
import { getTasksByCreatorId } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  try {
    const request: GetTasksByCreatorIdRequest = {
      ...req.body,
      creatorId: req.body.userId,
    };
    const tasks = await getTasksByCreatorId(request);
    res.send(tasks);
  } catch (error) {
    console.error("Error getting tasks by creator id: ", error);
    res
      .status(500)
      .send({ message: "Error getting tasks by creator id", error: error });
  }
};
