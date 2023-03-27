import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret_key = "jwt_secret_key";

export type TypeUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
};

export const hashingPassword = async (password: string): Promise<string> => {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
};

export const compareCheck = async (
  password: string,
  existedUserPassword: string
): Promise<boolean> => {
  const result = await bcrypt.compare(password, existedUserPassword);
  return result;
};

export const jwtSign = async (user: TypeUser): Promise<string> => {
  const token = await jwt.sign({ password: user.password }, secret_key, {
    expiresIn: "3h",
  });

  return token;
};
