import express from "express";
const router = express.Router();
// const { authenticateToken } = require("../api/handler/middleware/auth");

// router.get("/posts", (_req: Request, res: Response) => {
//   res.send({
//     message: "connect",
//   });
// });

router.use("/auth", require("./routes/auth"));
router.use("", require("./routes/post"));
router.use("", require("./routes/comment"));
router.use("", require("./routes/test"));

module.exports = router;
