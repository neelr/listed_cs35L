import { Request, Response } from "express";
import { RemoveFriendRequest } from "../types";
import { removeFriend } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  try {
    const friendInfo: RemoveFriendRequest = req.body;
    const removedFriend = await removeFriend(friendInfo);
    res.send(removedFriend);
  } catch (error) {
    console.error("Error removing friend: ", error);
    res.status(500).send({ message: "Error removing friend", error: error });
  }
};
