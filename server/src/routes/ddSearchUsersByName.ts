import { Request, Response } from "express";
import { SearchUsersByNameRequest as SearchUsersRequest } from "../types";
import { searchUsers } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  try {
    const { username } = req.query;
    if (typeof username !== "string" || username.length === 0) {
      throw "Invalid username";
    }
    const request: SearchUsersRequest = {
      username: username,
    };

    const users = await searchUsers(request);
    res.send(users);
  } catch (error) {
    console.error("Error searching users: ", error);
    res.status(500).send({ message: "Error searching users", error: error });
  }
};
