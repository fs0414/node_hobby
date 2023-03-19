const { prismaContext } = require("../context/prismaContext");

export const UsersGetModel = async () => {
  const allUsers = await prismaContext.user.findMany();

  return allUsers;
};
