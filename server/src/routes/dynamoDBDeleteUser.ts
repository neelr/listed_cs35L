import { Request, Response } from "express";
import { DeleteUserRequest } from "../types";
import { deleteUser } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  const userInfo: DeleteUserRequest = req.body;
  const userToBeDeleted = await deleteUser(userInfo);
  res.send(userToBeDeleted);
};
