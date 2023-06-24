import express, { Application, Request, Response } from "express";
export const app: Application = express();
import session from "express-session";
import passport from "passport";
import cors from "cors";

app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("view"));

app.use("", require("./router/index"));

app.use(
  cors({
    origin: "http://localhost:3030",
  })
);

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).send({
    message: "Hello World with hobby",
  });
});
