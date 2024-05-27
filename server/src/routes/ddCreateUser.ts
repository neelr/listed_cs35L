import { Request, Response } from "express";
import { CreateUserRequest } from "../types";
import { createUser } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  try {
    const userInfo: CreateUserRequest = req.body;
    const newUser = await createUser(userInfo);
    res.send(newUser);
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).send({ message: "Error creating user", error: error });
  }
};
