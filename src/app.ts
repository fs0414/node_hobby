import express, { Application, Request, Response } from "express";
export const app: Application = express();
const router = require("./router/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).send({
    message: "Hello World!",
  });
});
