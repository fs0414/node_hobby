import express from "express";
const router = express.Router();

const { AuthController } = require("../../api/controller/AuthController");
import { validateError } from "../../api/handler/rules/validateError";
const {
  authRegisterRule,
  authLoginRule,
} = require("../../api/handler/rules/Auth");
// import { authRegisterRule, authLoginRule } from "../../api/handler/rules/Auth";
// import { prismaContext } from "../../api/context/prismaContext";

const authContext = new AuthController();

router.get("/users", authContext.usersGet);
router.post("/register", authRegisterRule, validateError, authContext.register);
router.post("/login", authLoginRule, validateError, authContext.login);

module.exports = router;
