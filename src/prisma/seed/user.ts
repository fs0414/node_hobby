import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const alice01 = await prisma.user.upsert({
    where: { email: "user01@i.com" },
    create: {
      name: "user01",
      email: "user01@i.com",
      password: "user01",
      role: "USER",
    },
    update: {},
  });
  const alice02 = await prisma.user.upsert({
    where: { email: "user02@i.com" },
    create: {
      name: "user02",
      email: "user02@i.com",
      password: "user02",
      role: "ADMIN",
    },
    update: {},
  });
  console.log({ alice01, alice02 });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
