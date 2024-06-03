import { Request, Response } from "express";
import { deleteTask } from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const taskToBeDeleted = await deleteTask(taskId);
    res.send(taskToBeDeleted);
  } catch (error) {
    console.error("Error deleting task: ", error);
    res.status(500).send({ message: "Error deleting task", error: error });
  }
};
