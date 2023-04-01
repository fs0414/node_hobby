// import { User } from "@prisma/client";
import { Request, Response } from "express";
import {
  getPosts,
  storePost,
  updatePost,
  deletePost,
} from "../model/PostModel";

// type typeGetPosts = {
//   post: {
//     id: number;
//     title: string;
//     content: string;
//     userId: number;
//     user: {
//       name: string;
//     };
//     comments: {
//       content: string;
//     };
//   };
// };

export class PostController {
  async getPosts(_req: Request, res: Response): Promise<void> {
    const posts = await getPosts();

    // const responseJson: typeGetPosts[] = posts.map((post) => {
    //   return {
    //     post: {
    //       id: post.id,
    //       title: post.title,
    //       content: post.content,
    //       userId: post.userId,
    //       user: {
    //         name: post.user.name,
    //       },
    //       comments: {
    //         postId: post.comments[],
    //       },
    //     },
    //   };
    // });

    res.status(200).json({
      message: "get posts success",
      posts,
    });
  }

  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { title, content, userId } = req.body;
      const post = await storePost(title, content, userId);

      if (!post) {
        throw new Error("not create post");
      }
      res.status(201).json({
        message: "create post success",
        post,
      });
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
}
