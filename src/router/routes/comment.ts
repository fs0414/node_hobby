import express from "express";
import { CommentController } from "../../api/controller/CommentController";
const router = express.Router();
const { authenticateToken } = require("../../api/handler/middleware/auth");

const commentContext = new CommentController();

router.get("/comments", authenticateToken, commentContext.getComments);
router.get("/comment/:id", authenticateToken, commentContext.getComment);
router.post("/comment", authenticateToken, commentContext.createComment);
router.put("/comment/:id", authenticateToken, commentContext.putComment);
router.delete("/comment/:id", authenticateToken, commentContext.deleteComment);

module.exports = router;
