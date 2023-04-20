import { Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();
const {
  usersGet,
  fetchUserPassword,
  registerUser,
} = require("../model/AuthModel");
const {
  hashingPassword,
  jwtSign,
  compareCheck,
} = require("../service/AuthService");
const {
  poolUsersGet,
  registerPoolUser,
  // cognitoLogin,
} = require("../service/cognito/index");

export class AuthController {
  async usersGet(_req: Request, res: Response) {
    const allUsers = await usersGet();

    const poolUsers = await poolUsersGet();

    return res.status(200).send({
      allUsers,
      poolUsers,
    });
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, isPassword, role } = req.body;
      const hashedPassword = await hashingPassword(isPassword);

      const user = await registerUser(req.body, hashedPassword);

      if (!user) throw new Error("not register user");

      const poolUser = await registerPoolUser(
        name,
        email,
        role,
        hashedPassword
      );

      res.status(201).json({ user, poolUser });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, isPassword } = req.body;

      const existedUserPassword = await fetchUserPassword(email);

      if (existedUserPassword === null) throw new Error("not exited user");

      const isMatchUser = await compareCheck(isPassword, existedUserPassword);

      if (isMatchUser === false) {
        throw new Error("not compare password");
      }

      // const cogitoLoginUser = await cognitoLogin(email, isPassword);

      // const accessToken = cogitoLoginUser.AuthenticationResult.AccessToken;

      const token = await jwtSign(email);

      if (!token) throw new Error("not create token");

      res.status(201).json({ token });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }
}
