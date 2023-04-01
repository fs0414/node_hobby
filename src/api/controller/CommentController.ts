import { Request, Response } from "express";
import { allComment, getComment, storeComment } from "../model/CommentModel";

export class CommentController {
  async getComments(_req: Request, res: Response): Promise<void> {
    const comments = await allComment();
    res.status(200).json({
      message: "get comments success",
      comments,
    });
  }

  async getComment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const comment = await getComment(id);

    res.status(200).json({
      message: "get comment success",
      comment,
    });
  }

  async createComment(req: Request, res: Response): Promise<void> {
    try {
      const { content, userId, postId } = req.body;
      const comment = await storeComment(content, userId, postId);
      res.status(201).json({
        message: "post comment success",
        comment,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
}
