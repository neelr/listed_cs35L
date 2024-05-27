import { Request, Response } from "express";
import { SignInErrors, SignInRequest } from "../types";
import { signIn } from "../utils/dynamoDBUsers";

export default async (req: Request, res: Response) => {
  try {
    const request: SignInRequest = req.body;
    const response = await signIn(request);
    switch (response?.error) {
      case SignInErrors.USER_NOT_FOUND:
        res.status(404);
      case SignInErrors.INCORRECT_PASSWORD:
        res.status(401);
    }
    res.send(response);
  } catch (error) {
    console.error("Error signing in: ", error);
    res.status(500).send({ message: "Error ", error: error });
  }
};
