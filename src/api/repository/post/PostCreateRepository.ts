import { prismaContext } from "../../../lib/prismaContext";
import { Post } from "@prisma/client";
import { CreatePostRepositoryIf } from "./PostCreateRepositoryIf";

export class CratePostRepository implements CreatePostRepositoryIf {
    title: string;
    content: string;
    userId: number;
    
    constructor(title: string, content: string, userId: number) {
        this.title = title
        this.content = content
        this.userId = userId
    }

    async run(): Promise<Post> {
        return await prismaContext.post.create({
            data: {
                title: this.title,
                content: this.content,
                userId: this.userId,
            }
        })
    }
}