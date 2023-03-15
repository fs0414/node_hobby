import express, { Application, Request, Response } from "express";
// import { router } from "./router/index";
// import router from "./router/index";
// const { router } = require("./router/index");

const app: Application = express();
// const router = express.Router();
const PORT = 3000;
// const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/", require("./router/index"));
app.use("/api", require("./router/index"));

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
