import express from "express";
const router = express.Router();
// import { authenticateToken } from "../api/handler/middleware/auth";

router.use("/auth", require("./auth/auth"));

module.exports = router;
