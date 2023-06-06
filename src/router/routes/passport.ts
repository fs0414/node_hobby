import express from "express";
const router = express.Router();
import { PassportController } from "../../api/controller/PassportController";

const passportContext = new PassportController();

router.get("/passport", passportContext.passportLogin);

module.exports = router;
