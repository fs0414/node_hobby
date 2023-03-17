import express, { Application, Request, Response } from "express";
const app: Application = express();
const PORT = 3000;
const router = require("./router/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

try {
  app.listen(PORT, () => {
    console.log(`dev server running at: http://localhost:${PORT}/`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
