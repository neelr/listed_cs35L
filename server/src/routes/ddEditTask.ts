import { Request, Response } from "express";
import { EditTaskRequest } from "../types";
import { editTask } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  try {
    const newTaskInfo: EditTaskRequest = req.body;
    const taskId = req.params.taskId;
    const newTask = await editTask(taskId, newTaskInfo);
    res.send(newTask);
  } catch (error) {
    console.error("Error updating task: ", error);
    res.status(500).send({ message: "Error updating task", error: error });
  }
};
