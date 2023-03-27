import express from "express";
const router = express.Router();

const { AuthController } = require("../../api/controller/AuthController");

const authInstance = new AuthController();

router.get("/users", authInstance.usersGet);
router.post("/register", authInstance.register);
router.post("/login", authInstance.login);

module.exports = router;
