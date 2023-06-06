const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");
import { Post } from "@prisma/client";
import { prismaContext } from "../lib/prismaContext";

const resolvers = {
  Query: {
    posts: async (
      _parent: any,
      _args: { id: number; title: string },
      context: any
    ): Promise<Post> => {
      const posts = context.prismaContext.post.findMany({
        include: {
          comments: true,
        },
      });
      return posts;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, "schemas/postSchema.graphql"),
    "utf-8"
  ),
  resolvers,
  context: {
    prismaContext,
  },
});

server
  .listen()
  .then(({ url }: any) => console.log(`graphql server started port ${url}`));
