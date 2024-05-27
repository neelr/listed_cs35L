import { Request, Response } from "express";
import { GetUserByIdRequest } from "../types";
import { getUserById } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  try {
    const userId: GetUserByIdRequest = req.body;
    const newUser = await getUserById(userId);
    res.send(newUser);
  } catch (error) {
    console.error("Error getting user: ", error);
    res.status(500).send({ message: "Error getting user", error: error });
  }
};
