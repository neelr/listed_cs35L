import { Request, Response } from "express";
import { GetFriendsDetailsRequest } from "../types";
import { getFriendsDetails } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  try {
    const request: GetFriendsDetailsRequest = req.body;
    const friends = await getFriendsDetails(request);
    res.send(friends);
  } catch (error) {
    console.error("Error getting details of friends: ", error);
    res
      .status(500)
      .send({ message: "Error getting details of friends", error: error });
  }
};
