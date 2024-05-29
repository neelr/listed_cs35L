import { Request, Response } from "express";
import { CreateTaskRequest } from "../types";
import { createTask } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  try {
    const taskInfo: CreateTaskRequest = req.body;
    const newTask = await createTask(taskInfo);
    res.send(newTask);
  } catch (error) {
    console.error("Error creating task: ", error);
    res.status(500).send({ message: "Error creating task", error: error });
  }
};
