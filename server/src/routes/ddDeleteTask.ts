import { Request, Response } from "express";
import { DeleteTaskRequest } from "../types";
import { deleteTask } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  try {
    const taskId: DeleteTaskRequest = req.body;
    const taskToBeDeleted = await deleteTask(taskId);
    res.send(taskToBeDeleted);
  } catch (error) {
    console.error("Error deleting task: ", error);
    res.status(500).send({ message: "Error deleting task", error: error });
  }
};
