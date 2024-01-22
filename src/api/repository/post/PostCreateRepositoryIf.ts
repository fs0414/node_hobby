import { Post } from "@prisma/client";

export interface CreatePostRepositoryIf {
    title: string;
    content: string;
    userId: number;
    
   run(): Promise<Post>
}