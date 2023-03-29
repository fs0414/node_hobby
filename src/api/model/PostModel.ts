import { Post } from "@prisma/client";
import { prismaContext } from "../context/prismaContext";

export const getPosts = async (): Promise<Post[]> => {
  const allPosts = await prismaContext.post.findMany();
  return allPosts;
};

type typeStorePost = {
  title: string;
  content: string;
  userId: number;
};

// type typeUpdatePost = {
//   id: number;
//   title: string;
//   content: string;
// };

export const storePost = async (
  title: string,
  content: string,
  userId: number
): Promise<typeStorePost> => {
  const newPost = await prismaContext.post.create({
    data: {
      title,
      content,
      userId,
    },
  });

  return newPost;
};

export const updatePost = async (
  id: number,
  title: string,
  content: string
): Promise<any> => {
  const post = await prismaContext.post.update({
    where: { id },
    data: { title, content },
  });

  return post;
};
