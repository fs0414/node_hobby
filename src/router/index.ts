import express from "express";
const router = express.Router();

router.use("/auth", require("./auth/auth"));

module.exports = router;
