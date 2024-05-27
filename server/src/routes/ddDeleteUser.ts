import { Request, Response } from "express";
import { DeleteUserRequest } from "../types";
import { deleteUser } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  try {
    const userInfo: DeleteUserRequest = req.body;
    const userToBeDeleted = await deleteUser(userInfo);
    res.send(userToBeDeleted);
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).send({ message: "Error deleting user", error: error });
  }
};
