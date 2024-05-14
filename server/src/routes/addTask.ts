import { Request, Response } from 'express';
import { Task } from '../types';
import { createTask } from '../utils/serverInterface';

export default async (req: Request, res: Response) => {
    const task: Task = req.body;
    const newTask = createTask(task);
    res.send(newTask);
} 