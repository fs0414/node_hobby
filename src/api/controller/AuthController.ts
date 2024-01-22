import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { usersGet, fetchUserPassword, registerUser } from "../repository/AuthRepository";
import { hashingPassword, jwtSign, compareCheck } from "../service/AuthService";
// import { poolUsersGet } from "../service/cognito/index";

export class AuthController {
  async usersGet(_req: Request, res: Response) {
    console.log("psotman connect");
    const allUsers = await usersGet();

    console.log({ allUsers })
    // const poolUsers = await poolUsersGet();

    return res.status(200).send(allUsers);
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { userName, email, isPassword, role } = req.body;

      const hashedPassword = await hashingPassword(isPassword);

      const user = await registerUser(
        userName,
        email,
        isPassword,
        role,
        hashedPassword
      );

      if (!user) throw new Error("not register user");

      res.status(201).json({ user });
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

      if (existedUserPassword === undefined) throw new Error("not exited user");

      const isMatchUser = await compareCheck(isPassword, existedUserPassword);

      if (isMatchUser === false) {
        throw new Error("not compare password");
      }

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
