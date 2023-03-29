import express, { Application, Request, Response } from "express";
// const router = express.Router();
export const app: Application = express();
// const APIrouter = require("./router/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./router/index"));

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).send({
    message: "Hello World!",
  });
});
