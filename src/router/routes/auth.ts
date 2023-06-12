import express from "express";
const apiRouter = express.Router();
const { AuthController } = require("../../api/controller/AuthController");
const { validateError } = require("../../api/handler/rules/validateError");
const {
  authRegisterRule,
  authLoginRule,
} = require("../../api/handler/rules/auth");

const authContext = new AuthController();

apiRouter.get("/users", authContext.usersGet);
apiRouter.post(
  "/register",
  authRegisterRule,
  validateError,
  authContext.register
);
apiRouter.post("/login", authLoginRule, validateError, authContext.login);

module.exports = apiRouter;
