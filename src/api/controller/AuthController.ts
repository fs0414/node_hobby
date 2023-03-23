import { Request, Response } from "express";

// import { HashPassword } from "../service/auth";
const { prismaContext } = require("../context/prismaContext");
const { usersGetModel } = require("../model/UserModel");
const { hashPassword } = require("../service/auth");

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
    const allUsers = await usersGetModel();
    return res.status(200).send({
      message: allUsers,
    });
  }

  async register(req: Request, res: Response): Promise<void> {
    console.log("register");
    try {
      const { name, email, password, role } = req.body;
      // const { password } = req.body;

      if (!name || !email || !password || !role) {
        throw new Error("bad request");
      }

      const createdUser = await prismaContext.user.findUnique({
        where: { email: email },
      });

      if (createdUser) {
        throw new Error("user already exits");
      }

      const hashedPassword = await hashPassword(password);

      const user = await prismaContext.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
      });

      res.json({ user });
    } catch (error) {
      res.status(400).json({
        message: "bas request",
      });
    }
  }
}
