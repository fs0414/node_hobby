import { Request, Response } from "express";
import { app } from "../../app";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prismaContext } from "../../lib/prismaContext";
import jwt from "jsonwebtoken";

export class GooglePassportController {
  async passportLogin(_req: Request, res: Response): Promise<void> {
    try {
      passport.use(
        new GoogleStrategy(
          {
            clientID:
              "756883617351-2599ncd0agh253le925vbrlp65c4ogne.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3000/auth/google/callback",
            passReqToCallback: true,
          },
          async (
            _accessToken: any,
            _refreshToken: any,
            profile: any,
            _done: any,
            req: any,
            cb: any
          ): Promise<void> => {
            console.log("req :", req);
            console.log("req.id :", req.id);
            console.log("req._json :", req._json);
            console.log("req._json.sub :", req._json.sub);
            console.log("-----------------");
            console.log("profile :", profile);

            // let user = "test";

            let user = await prismaContext.googleUser.findFirst({
              where: { googleId: req._raw.sub[0] },
            });
            if (!user) {
              user = await prismaContext.googleUser.create({
                data: {
                  userName: req.displayName,
                  googleId: req._raw.sub[0],
                },
              });
            }

            //---

            // console.log({ accessToken });
            // const decodedIdToken = jwt.decode(profile.idToken);
            // console.log("profile :", profile);
            // console.log("profile.id :", profile.id);
            // console.log("profile.displayName :", profile.displayName);
            // console.log("profile :", profile);
            // console.log("profile.idToken :", profile.idToken);
            // console.log("profile.decodedIdToken:", decodedIdToken);

            // let user = await prismaContext.googleUser.findFirst({
            //   where: { googleId: profile.id },
            // });
            // if (!user) {
            //   user = await prismaContext.googleUser.create({
            //     data: {
            //       userName: profile.displayName,
            //       googleId: profile.id,
            //     },
            //   });
            // }
            cb(null, user);
            // }
          }
        )
      );

      passport.serializeUser((user: any, done: any) => {
        done(null, user);
      });

      passport.deserializeUser((user: any, done: any) => {
        done(null, user);
      });

      app.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["profile"] })
      );

      app.get(
        "/auth/google/callback",
        passport.authenticate("google", {
          failureRedirect: "http://localhost:3000/",
        }),
        (req: Request, res: Response) => {
          const token = jwt.sign({ userId: req.user }, "your-jwt-secret", {
            expiresIn: "1h",
          });
          res.json({ token });
        }
      );
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }
}
