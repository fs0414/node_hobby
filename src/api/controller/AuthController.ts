import { User } from "@prisma/client";
import { Request, Response } from "express";
const {
  usersGet,
  fetchUserPassword,
  alreadyUserCheck,
  registerUser,
} = require("../model/AuthModel");
const { hashingPassword, jwtSign, compareCheck } = require("../service/auth");

export interface ResponseUserGet {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export class AuthController {
  async usersGet(_req: Request, res: Response) {
    console.log("usersGet");
    const allUsers = await usersGet();
    return res.status(200).send({
      message: allUsers,
    });
  }

  async register(req: Request, res: Response): Promise<void> {
    console.log("register");
    try {
      const { name, email, password, role } = req.body;

      // todo: validationをmiddlewareに切り出す。
      if (!name || !email || !password || !role) {
        throw new Error("bad request");
      }

      const createdUser = await alreadyUserCheck(email);

      if (createdUser) {
        throw new Error("user already exits");
      }

      const hashedPassword = await hashingPassword(password);

      const user: User = await registerUser(req, hashedPassword);

      if (!user) throw new Error("not register user");

      console.log({ user });

      res.status(201).json({ user });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      console.log("test3");

      if (!email || !password) throw new Error("not credentials");

      const existedUserPassword = await fetchUserPassword(email);

      console.log({ existedUserPassword });

      if (existedUserPassword === null) throw new Error("not exited user");

      const compareResult = await compareCheck(password, existedUserPassword);

      console.log({ compareCheck });

      if (compareResult === false) {
        throw new Error("not compare password");
      }

      const token = await jwtSign(existedUserPassword);

      if (!token) throw new Error("not sign token");

      res.status(201).json({ token });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }
}
