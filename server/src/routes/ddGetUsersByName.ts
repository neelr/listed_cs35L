import { Request, Response } from "express";
import { GetUserIdByEmailRequest } from "../types";
import { getUsersByName } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  try {
    const request: GetUserIdByEmailRequest = req.body;
    const users = await getUsersByName(request);
    res.send(users);
  } catch (error) {
    console.error("Error getting user by email: ", error);
    res
      .status(500)
      .send({ message: "Error getting user by email", error: error });
  }
};
