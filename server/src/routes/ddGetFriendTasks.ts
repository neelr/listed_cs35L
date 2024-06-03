import { Request, Response } from "express";
import { getTasksByUserIds } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  try {
    const request = req.params.userId;
    const tasks = await getTasksByUserIds({ userIds: [request] });
    res.send(tasks);
  } catch (error) {
    console.error("Error getting tasks by friend id: ", error);
    res
      .status(500)
      .send({ message: "Error getting tasks by friend id", error: error });
  }
};
