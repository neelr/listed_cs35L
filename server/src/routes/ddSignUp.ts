import { Request, Response } from "express";
import { CreateUserRequest } from "../types";
import { signUp } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  try {
    const userInfo: CreateUserRequest = req.body;
    const newUser = await signUp(userInfo);
    res.send(newUser);
  } catch (error) {
    console.error("Error signing up: ", error);
    res.status(500).send({ message: "Error signing up", error: error });
  }
};
