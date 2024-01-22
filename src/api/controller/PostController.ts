// import { User } from "@prisma/client";
import { Request, Response } from "express";
import {
  getPosts,
  // storePost,
  updatePost,
  deletePost,
} from "../repository/PostRepository";
import { prismaContext } from "../../lib/prismaContext";
import cron from "node-cron";
import { CratePostRepository } from "../repository/post/PostCreateRepository"

export class PostController {
  async getPosts(_req: Request, res: Response): Promise<void> {
    const posts = await getPosts();

    res.status(200).json(posts);
  }

  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, userId } = req.body;
      // const post = await storePost(title, content, userId);
      const post = await new CratePostRepository(title, content, userId).run()

      if (!post) {
        throw new Error("not create post");
      }

      console.log({ post })

      res.status(201).json(post);
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async putPost(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { title, content } = req.body;
      const post = await updatePost(id, title, content);

      if (!post) {
        throw new Error("not update post");
      }

      res.status(201).json({
        message: "update post success",
        post,
      });
    } catch (error: any) {
      res.status(491).json({
        message: error.message,
      });
    }
  }

  async destroyPost(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    try {
      const post = await deletePost(id);

      if (!post) {
        throw new Error("not delete post");
      }

      res.status(200).json({
        message: "delete post success",
        post,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }

  async cronPosts(_req: Request, res: Response): Promise<void> {
    try {
      cron.schedule("*/20 * * * * *", async () => {
        const post = await prismaContext.post.findMany();
        console.log(post);
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
}
