import { prismaContext } from "../context/prismaContext";
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
