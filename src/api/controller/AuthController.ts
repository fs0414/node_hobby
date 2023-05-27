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
    console.log("psotman connect");
    const allUsers = await usersGet();

    const poolUsers = await poolUsersGet();

    return res.status(200).send({
      allUsers,
      poolUsers,
    });
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { userName, email, isPassword, role } = req.body;

      const poolUser = await registerPoolUser(
        userName,
        email,
        isPassword,
        role
      );

      const hashedPassword = await hashingPassword(isPassword);

      const user = await registerUser(req.body, hashedPassword);

      if (!user) throw new Error("not register user");

      res.status(201).json({ user, poolUser });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { userName, isPassword } = req.body;

      const existedUserPassword = await fetchUserPassword(userName);

      if (existedUserPassword === null) throw new Error("not exited user");

      const isMatchUser = await compareCheck(isPassword, existedUserPassword);

      if (isMatchUser === false) {
        throw new Error("not compare password");
      }

      // const cogitoLoginUser = await cognitoLogin(userName, isPassword);

      // console.log({ cogitoLoginUser });

      // const accessToken = cogitoLoginUser.AuthenticationResult.AccessToken;

      // console.log({ accessToken });

      const token = await jwtSign(userName);

      if (!token) throw new Error("not create token");

      res.status(201).json({ token });
      // res.status(201).json({ token, cogitoLoginUser });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }
}
