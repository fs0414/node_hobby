import { PrismaClient } from "@prisma/client";

export const prismaContext = new PrismaClient();

// type typeContext = {
//   prisma: PrismaClient;
// };

// export const prismaContext = (): typeContext => {
//   return {
//     prisma: new PrismaClient(),
//   };
// };
