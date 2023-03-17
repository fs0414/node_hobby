import { Request, Response } from "express";

const { prismaContext } = require("../context/prismaContext");

export const UsersGet = async (_req: Request, res: Response) => {
  const allUsers = await prismaContext.user.findMany();
  // const allUsers = await
  return res.status(200).send({
    message: allUsers,
  });
};
