import express from "express";
const router = express.Router();
const { AuthController } = require("../../api/controller/AuthController");
const { validateError } = require("../../api/handler/rules/validateError");
const {
  authRegisterRule,
  authLoginRule,
} = require("../../api/handler/rules/auth");

const authContext = new AuthController();

router.get("/users", authContext.usersGet);
router.post("/register", authRegisterRule, validateError, authContext.register);
router.post("/login", authLoginRule, validateError, authContext.login);

module.exports = router;
