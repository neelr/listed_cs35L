import { Request, Response } from "express";
import { CreateUserRequest } from "../types";
import { createUser } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  const userInfo: CreateUserRequest = req.body;
  const newUser = await createUser(userInfo);
  res.send(newUser);
};
