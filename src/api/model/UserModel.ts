const { prismaContext } = require("../context/prismaContext");

export const usersGetModel = async () => {
  const allUsers = await prismaContext.user.findMany();

  return allUsers;
};
