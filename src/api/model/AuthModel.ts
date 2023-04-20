import { User } from "@prisma/client";
import { prismaContext } from "../context/prismaContext";
// users

export const usersGet = async (): Promise<User[]> => {
  const allUsers = await prismaContext.user.findMany({
    include: { posts: true },
  });

  return allUsers;
};

// auth/register

export const registerUser = async (
  body: User,
  hashedPassword: string
): Promise<User> => {
  let { name, email, isPassword, role } = body;
  isPassword = hashedPassword;
  const user = await prismaContext.user.create({
    data: {
      name,
      email,
      isPassword,
      role,
    },
  });

  return user;
};

// auth/login

export const alreadyUserCheck = async (email: string): Promise<User | null> => {
  return await prismaContext.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const fetchUserPassword = async (
  email: string
): Promise<string | undefined> => {
  const resultUser = await prismaContext.user.findFirst({
    where: {
      email: email,
    },
    select: {
      isPassword: true,
    },
  });

  const existedUserPassword = resultUser?.isPassword;

  return existedUserPassword;
};
