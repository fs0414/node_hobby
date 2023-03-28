import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY || "";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("401 authorization not");
    }

    // token bearer is split
    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token);

    console.log({ payload });

    console.log("payload.email", payload.email);

    next();
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
};

const verifyToken = async (token: string) => {
  console.log({ token });
  const decodedToken = jwt.verify(token, jwtSecret);
  console.log({ decodedToken });
  return decodedToken;
};
