import express from "express";
const router = express.Router();

router.use("/api/auth", require("./routes/auth"));
router.use("/api", require("./routes/post"));
router.use("/api", require("./routes/comment"));
router.use("/api", require("./routes/s3"));
router.use("/api", require("./routes/googlePassport"));
router.use("/api", require("./routes/product"));
router.use("/api", require("./routes/product"));
router.use("/api", require("./routes/lambda"));

module.exports = router;
