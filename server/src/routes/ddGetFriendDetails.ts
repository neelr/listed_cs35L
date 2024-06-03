import { Request, Response } from "express";
import { getUserById } from "../utils/dynamoDBUsers";
import { omitSensitiveKeys } from "../utils/utils";

export default async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const friend = await getUserById({ userId });

    res.send(omitSensitiveKeys(friend));
  } catch (error) {
    console.error("Error getting friend details: ", error);
    res
      .status(500)
      .send({ message: "Error getting friend details", error: error });
  }
};
