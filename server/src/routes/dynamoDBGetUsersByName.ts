import { Request, Response } from "express";
import { GetUsersByNameRequest } from "../types";
import { getUsersByName } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  const request: GetUsersByNameRequest = req.body;
  const users = await getUsersByName(request);
  res.send(users);
};
