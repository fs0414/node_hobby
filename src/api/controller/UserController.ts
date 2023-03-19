import { Request, Response } from "express";

// const { prismaContext } = require("../context/prismaContext");
const { UsersGetModel } = require("../model/UserModel");

export const UsersGet = async (_req: Request, res: Response) => {
  // const allUsers = await prismaContext.user.findMany();
  const allUsers = await UsersGetModel();
  return res.status(200).send({
    message: allUsers,
  });
};
