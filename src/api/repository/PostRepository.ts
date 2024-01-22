import { Post } from "@prisma/client";
import { prismaContext } from "../../lib/prismaContext";

export const getPosts = async (): Promise<any> => {
  const allPosts = await prismaContext.$transaction([
    prismaContext.post.findMany({
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    }),
  ]);
  return allPosts;
};

export const storePost = async (
  title: string,
  content: string,
  userId: number
): Promise<Post[]> => {
  const newPost = await prismaContext.$transaction([
    prismaContext.post.create({
      data: {
        title,
        content,
        userId,
      },
    }),
  ]);

  return newPost;
};

export const updatePost = async (
  id: number,
  title: string,
  content: string
): Promise<Post[]> => {
  const post = await prismaContext.$transaction([
    prismaContext.post.update({
      where: { id },
      data: { title, content },
      include: { user: true },
    }),
  ]);

  return post;
};

export const deletePost = async (id: number): Promise<Post[]> => {
  const post = await prismaContext.$transaction([
    prismaContext.post.delete({
      where: {
        id,
      },
    }),
  ]);

  return post;
};
