import { Request, Response } from "express";
import { EditTaskRequest } from "../types";
import { editTask } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  try {
    const newTaskInfo: EditTaskRequest = req.body;
    const newTask = await editTask(newTaskInfo);
    res.send(newTask);
  } catch (error) {
    console.error("Error updating task: ", error);
    res.status(500).send({ message: "Error updating task", error: error });
  }
};
