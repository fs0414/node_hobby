import { prismaContext } from "../../lib/prismaContext";
import { Comment } from "@prisma/client";

export const allComment = async () => {
  const comments = prismaContext.comment.findMany();
  return comments;
};

export const getComment = async (id: string): Promise<Comment | null> => {
  const comment = prismaContext.comment.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  return comment;
};

export const storeComment = async (
  content: string,
  userId: number,
  postId: number
): Promise<Comment | null> => {
  const comment = prismaContext.comment.create({
    data: {
      content,
      userId,
      postId,
    },
  });
  return comment;
};

export const updateComment = async (
  id: string,
  content: string
): Promise<Comment> => {
  const comment = await prismaContext.comment.update({
    where: {
      id: parseInt(id),
    },
    data: {
      content,
    },
  });

  return comment;
};

export const destroyComment = async (id: string): Promise<Comment> => {
  const comment = await prismaContext.comment.delete({
    where: {
      id: parseInt(id),
    },
  });

  return comment;
};
