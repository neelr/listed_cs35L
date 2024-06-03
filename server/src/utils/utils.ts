import { createHash } from "crypto";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../server";
import { SENSITIVE_KEYS } from "./constants";

export const getHashFromCurrentDate = () => {
  const currentDate = new Date();
  return createHash("sha256").update(currentDate.toISOString()).digest("hex");
};

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const omitKeys = (obj: any, keys: string[]) => {
  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
};

export const omitSensitiveKeys = (obj: any) => {
  return omitKeys(obj, SENSITIVE_KEYS);
};

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, userId) => {
      if (err) {
        return res.status(401).send({ error: "Invalid token" });
      }
      if (typeof userId === "string") {
        userId = { userId };
      }
      req.body = { ...req.body, ...userId };
      next();
    });
  } else {
    res.status(401).send({ error: "Unauthorized" });
  }
};
