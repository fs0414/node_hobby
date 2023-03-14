const { PrismaClient } = require("@prisma/client");
// import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany();
  console.log({ allUsers });
  console.log("prisma gosurori");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
