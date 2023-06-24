import { Role, User } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";
// users

export const usersGet = async (): Promise<User[]> => {
  const allUsers = await prismaContext.user.findMany({
    include: { posts: true },
  });

  return allUsers;
};

// auth/register

export const registerUser = async (
  userName: string,
  email: string,
  isPassword: string,
  role: Role,
  hashedPassword: string
): Promise<User | any> => {
  // let { userName, email, isPassword, role } = body;
  isPassword = hashedPassword;
  const user = await prismaContext.user.create({
    data: {
      userName,
      email,
      isPassword,
      role,
    },
  });
  //localhost:3000/auth/google
  http: return user;
};

// auth/login

export const alreadyUserCheck = async (
  userName: string
): Promise<User | null> => {
  return await prismaContext.user.findUnique({
    where: {
      userName: userName,
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
