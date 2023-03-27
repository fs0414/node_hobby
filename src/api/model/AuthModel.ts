import { Role, User } from "@prisma/client";
import { prismaContext } from "../context/prismaContext";
// const { prismaContext } = require("../context/prismaContext");

export const usersGet = async () => {
  const allUsers = await prismaContext.user.findMany();

  return allUsers;
};

export const alreadyUserCheck = async (email: string): Promise<User | null> => {
  return await prismaContext.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const fetchUserPassword = async (
  email: string
): Promise<string | null> => {
  const resultUser = await prismaContext.user.findFirst({
    where: {
      email: email,
    },
    select: {
      password: true,
    },
  });

  if (resultUser == null) {
    throw new Error("resultUser is null");
  }

  const { password } = resultUser;

  return password;
};

type typeReq = {
  body: {
    name: string;
    email: string;
    password: string;
    role: Role;
  };
};

export const registerUser = async (
  req: typeReq,
  hashedPassword: string
): Promise<User> => {
  let { name, email, password, role } = req.body;
  password = hashedPassword;
  const user = await prismaContext.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });

  return user;
};
