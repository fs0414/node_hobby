import { Request, Response } from "express";
const passport = require("passport");

export class PassportController {
  User = {
    id: 1234,
    username: "testUser",
    password: "testPassword",
  };

  async helloPassport(_req: Request, res: Response): Promise<any> {
    return res.status(200).send({
      message: "hello passport",
    });
  }

  async renderLogin(_req: Request, res: Response): Promise<any> {
    res.send(`
        <h1>Login</h1>
        <form method="POST" action="/api/passport/login">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" />
            <br />
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" />
            <br />
            <button type="submit">Submit</button>
        </form>
    `);
  }

  async passportLogin() {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/api/passport/login",
    });
  }

  async passportLogout(req: any, res: Response) {
    req.logout();
    res.redirect("/");
  }
}
