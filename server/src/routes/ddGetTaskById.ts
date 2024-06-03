import { Request, Response } from "express";
import { getTaskById } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const newTask = await getTaskById(taskId);
    res.send(newTask);
  } catch (error) {
    console.error("Error getting task by id: ", error);
    res.status(500).send({ message: "Error getting task by id", error: error });
  }
};
