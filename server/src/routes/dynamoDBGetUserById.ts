import { Request, Response } from "express";
import { GetUserByIdRequest } from "../types";
import { getUserById } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  const userId: GetUserByIdRequest = req.body;
  const newUser = await getUserById(userId);
  res.send(newUser);
};
