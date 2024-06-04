import { Request, Response } from "express";
import { SearchUsersByNameRequest as SearchUsersRequest } from "../types";
import { getAllUsers, searchUsers } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  try {
    const { username } = req.query;
    if (typeof username !== "string") {
      throw "Invalid username";
    }
    if (username === "") {
      const users = await getAllUsers();
      res.send(users);
    } else {
      const request: SearchUsersRequest = {
        username: username,
      };

      const users = await searchUsers(request);
      res.send(users);
    }
  } catch (error) {
    console.error("Error searching users: ", error);
    res.status(500).send({ message: "Error searching users", error: error });
  }
};
