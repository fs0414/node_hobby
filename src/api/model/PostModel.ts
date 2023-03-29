import { Post } from "@prisma/client";
import { prismaContext } from "../context/prismaContext";

export const getPosts = async (): Promise<Post[]> => {
  const allPosts = await prismaContext.post.findMany({
    include: {
      user: true,
    },
  });
  return allPosts;
};

export const storePost = async (
  title: string,
  content: string,
  userId: number
): Promise<Post> => {
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
): Promise<Post> => {
  const post = await prismaContext.post.update({
    where: { id },
    data: { title, content },
  });

  return post;
};

export const deletePost = async (id: number): Promise<Post> => {
  const post = await prismaContext.post.delete({
    where: {
      id,
    },
  });

  return post;
};
