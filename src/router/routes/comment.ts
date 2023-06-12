import express from "express";
import { CommentController } from "../../api/controller/CommentController";
const apiRouter = express.Router();
const { authenticateToken } = require("../../api/handler/middleware/auth");

const commentContext = new CommentController();

apiRouter.get("/comments", authenticateToken, commentContext.getComments);
apiRouter.get("/comment/:id", authenticateToken, commentContext.getComment);
apiRouter.post("/comment", authenticateToken, commentContext.createComment);
apiRouter.put("/comment/:id", authenticateToken, commentContext.putComment);
apiRouter.delete("/comment/:id", authenticateToken, commentContext.deleteComment);

module.exports = apiRouter;
