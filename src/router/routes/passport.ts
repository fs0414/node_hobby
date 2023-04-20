import express from "express";
const router = express.Router();
import { PassportController } from "../../api/controller/PassportController";

const passportContext = new PassportController();

router.get("/passport", passportContext.helloPassport);
router.get("/passport/login", passportContext.renderLogin);
router.post("/passport/login", passportContext.passportLogin);
router.post("passport/logout", passportContext.passportLogout);

module.exports = router;
