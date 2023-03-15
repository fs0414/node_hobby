import express, { Application, Request, Response } from "express";
const router = require("express").Router();

router.get("/users", (_req: Request, res: Response) => {
  return res.status(200).send({
    message: "users",
  });
});
