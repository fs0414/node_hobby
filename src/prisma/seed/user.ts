import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "user01@i.com" },
    create: {
      name: "user01",
      email: "user01@i.com",
      password: "user01",
      role: "USER",
    },
    update: {},
  });
  console.log({ alice });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
