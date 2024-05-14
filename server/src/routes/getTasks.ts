import { Request, Response } from "express";
import { Task } from "../types";
import { getTasks } from "../utils/serverInterface";

export default async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const tasks = getTasks(id);
  res.send(tasks);
};
