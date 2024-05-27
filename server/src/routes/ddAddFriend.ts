import { Request, Response } from "express";
import { AddFriendRequest } from "../types";
import { addFriend, createUser } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  try {
    const friendInfo: AddFriendRequest = req.body;
    const newFriend = await addFriend(friendInfo);
    res.send(newFriend);
  } catch (error) {
    console.error("Error adding friend: ", error);
    res.status(500).send({ message: "Error adding friend", error: error });
  }
};
