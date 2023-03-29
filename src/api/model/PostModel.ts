import { Post } from "@prisma/client";
import { prismaContext } from "../context/prismaContext";

export const getPosts = async (): Promise<Post[]> => {
  const allPosts = await prismaContext.post.findMany();
  return allPosts;
};
