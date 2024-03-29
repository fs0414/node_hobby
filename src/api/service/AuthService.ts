import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY || "";

// auth/register

export const hashingPassword = async (isPassword: string): Promise<string> => {
  const hashed = await bcrypt.hash(isPassword, 10);
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

export const jwtSign = async (email: string): Promise<string> => {
  const payload = { email: email };
  const options = {
    expiresIn: "24h",
  };
  const token = await jwt.sign(payload, jwtSecret, options);

  return token;
};
