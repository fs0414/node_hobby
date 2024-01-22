import { PrismaClient } from "@prisma/client";

export const prismaContext = new PrismaClient();

// type typePrismaClient = {
//   prisma: PrismaClient;
// };

// export const prismaContext = (): typePrismaClient => {
//   return {
//     prisma: new PrismaClient(),
//   };
// };
