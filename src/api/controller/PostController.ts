import { Request, Response } from "express";
import { getPosts } from "../model/PostModel";

export class PostsController {
  async getPosts(_req: Request, res: Response) {
    const posts = await getPosts();

    res.status(200).json({
      message: posts,
    });
  }
}
