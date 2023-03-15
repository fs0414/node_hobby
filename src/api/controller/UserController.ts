import { Request, Response } from "express";

export const UsersGet = (_req: Request, res: Response) => {
  console.log("UsersGet");
  return res.status(200).send({
    message: "UsersGet",
  });
};

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
