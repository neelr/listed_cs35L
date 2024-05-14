import { Request, Response } from 'express';
import { User } from '../types';
import { createUser } from '../utils/serverInterface';

export default async (req: Request, res: Response) => {
    const user: User = req.body;
    const newUser = createUser(user);
    res.send(newUser);
} 