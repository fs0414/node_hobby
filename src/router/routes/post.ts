import express from "express";
import { PostController } from "../../api/controller/PostController";
const router = express.Router();
const { authenticateToken } = require("../../api/handler/middleware/auth");

const postContext = new PostController();

router.get("/posts", authenticateToken, postContext.getPosts);
router.post("/post", authenticateToken, postContext.createPost);
router.put("/post/:id", authenticateToken, postContext.putPost);
router.delete("/post/:id", authenticateToken, postContext.destroyPost);

module.exports = router;
