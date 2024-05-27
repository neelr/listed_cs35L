import { createHash } from "crypto";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../server";

export const getHashFromCurrentDate = () => {
  const currentDate = new Date();
  return createHash("sha256").update(currentDate.toISOString()).digest("hex");
};

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req.headers.authorization", req.headers.authorization);
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, userId) => {
      console.log("SECRET_KEY", SECRET_KEY);
      if (err) {
        console.log(err);
        return res.status(401).send({ error: "Invalid token" });
      }
      req.body = { ...req.body, userId };
      next();
    });
  } else {
    res.status(401).send({ error: "Unauthorized" });
  }
};
