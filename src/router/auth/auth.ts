import express from "express";
const router = express.Router();

const { AuthController } = require("../../api/controller/AuthController");

const authInstance = new AuthController();

router.get("/users", authInstance.usersGet);
router.post("/register", authInstance.register);
// router.get("/users", AuthController.usersGet);
// router.post("/register", AuthController.register);

module.exports = router;
