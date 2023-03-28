import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY || "";

// auth/register

export const hashingPassword = async (password: string): Promise<string> => {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
};

// auth/login

export const compareCheck = async (
  password: string,
  existedUserPassword: string
): Promise<boolean> => {
  const result = await bcrypt.compare(password, existedUserPassword);
  return result;
};

export const jwtSign = async (user: User): Promise<string> => {
  const token = await jwt.sign({ password: user.password }, jwtSecret, {
    expiresIn: "24h",
  });

  return token;
};
