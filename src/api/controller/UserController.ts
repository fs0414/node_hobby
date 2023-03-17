import { Request, Response } from "express";

const { prismaContext } = require("../context/prismaContext");

export const UsersGet = async (_req: Request, res: Response) => {
  const allUsers = await prismaContext.user.findMany();
  // const allUsers = await
  return res.status(200).send({
    message: allUsers,
  });
};

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prismaContext.$disconnect();
//   });

// const prisma = new PrismaClient();

// async function main() {
//   const allUsers = await prisma.user.findMany();
//   console.log({ allUsers });
//   console.log("prisma gosurori");
// }

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
