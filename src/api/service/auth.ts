import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<any> => {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
};
