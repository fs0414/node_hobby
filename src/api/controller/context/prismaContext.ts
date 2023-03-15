import { PrismaClient } from "@prisma/client";

export type typeContext = {
  prisma: PrismaClient;
};

export const prismaContext = (): typeContext => {
  return {
    prisma: new PrismaClient(),
  };
};
