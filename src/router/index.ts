// import { Request, Response } from "express";

// const { Request, Response } = require("express");
const router = require("express").Router();
// import { UsersGet } from "../api/controller/UserController";
const { UsersGet } = require("../api/controller/UserController");

// router.use("/auth", require("./auth"));
// router.use("/auth", (_req: Request, _res: Response) => {
//   console.log("test");
// });

router.get("/users", UsersGet);

module.exports = router;
