import { Request, Response } from "express";
import { getPosts, storePost } from "../model/PostModel";

export class PostsController {
  async getPosts(_req: Request, res: Response) {
    const posts = await getPosts();

    res.status(200).json({
      message: "getAll success",
      posts,
    });
  }

  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, userId } = req.body;
      const newPost = await storePost(title, content, userId);

      if (!newPost) {
        throw new Error("not create post");
      }
      res.status(201).json({
        message: "create success",
        newPost,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
}
