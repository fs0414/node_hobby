import express from "express";
const apiRouter = express.Router();
import { PassportController } from "../../api/controller/PassportController";

const passportContext = new PassportController();

apiRouter.get("/passport", passportContext.passportLogin);

module.exports = apiRouter;
