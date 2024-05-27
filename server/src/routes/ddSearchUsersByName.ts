import { Request, Response } from "express";
import { SearchUsersByNameRequest } from "../types";
import { searchUsersByName } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  try {
    const request: SearchUsersByNameRequest = req.body;
    const users = await searchUsersByName(request);
    res.send(users);
  } catch (error) {
    console.error("Error searching users: ", error);
    res.status(500).send({ message: "Error searching users", error: error });
  }
};
