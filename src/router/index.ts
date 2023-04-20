import express from "express";
const router = express.Router();

router.use("/auth", require("./routes/auth"));
router.use("", require("./routes/post"));
router.use("", require("./routes/comment"));
router.use("", require("./routes/test"));
router.use("", require("./routes/passport"));

module.exports = router;
