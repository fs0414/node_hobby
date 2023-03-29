import express from "express";
const router = express.Router();
const { authenticateToken } = require("../../api/handler/middleware/auth");
import { PostsController } from "../../api/controller/PostController";

const postContext = new PostsController();

router.get("/posts", authenticateToken, postContext.getPosts);

module.exports = router;
