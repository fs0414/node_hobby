import express from "express";
const apiRouter = express.Router();
import { PostController } from "../../api/controller/PostController";
const { authenticateToken } = require("../../api/handler/middleware/auth");

const postContext = new PostController();

apiRouter.get("/posts", authenticateToken, postContext.getPosts);
apiRouter.post("/post", authenticateToken, postContext.createPost);
apiRouter.put("/post/:id", authenticateToken, postContext.putPost);
apiRouter.delete("/post/:id", authenticateToken, postContext.destroyPost);
apiRouter.get("/cron/posts", postContext.cronPosts);

module.exports = apiRouter;
