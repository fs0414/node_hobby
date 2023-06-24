import express from "express";
const apiRouter = express.Router();
import { GooglePassportController } from "../../api/controller/GooglePassportController";

const passportContext = new GooglePassportController();

apiRouter.get("/passport", passportContext.passportLogin);

module.exports = apiRouter;
