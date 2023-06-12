import express from "express";
const apiRouter = express.Router();
// import { S3Controller } from "../../api/controller/S3Controller";
const { S3Controller } = require("../../api/controller/S3Controller");

const s3Context = new S3Controller();

apiRouter.get("/s3GetObject", s3Context.getObject);
apiRouter.post("/s3PutObject", s3Context.putObject);
apiRouter.post("/s3DeleteObject", s3Context.deleteObject);

module.exports = apiRouter;
