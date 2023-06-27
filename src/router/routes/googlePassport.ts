import express from "express";
const apiRouter = express.Router();
import { GooglePassportController } from "../../api/controller/GooglePassportController";

const googlePassportContext = new GooglePassportController();

apiRouter.get("/google-passport", googlePassportContext.passportLogin);

module.exports = apiRouter;
