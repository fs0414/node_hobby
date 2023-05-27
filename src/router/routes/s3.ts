import express from "express";
const router = express.Router();
// import { S3Controller } from "../../api/controller/S3Controller";
const { S3Controller } = require("../../api/controller/S3Controller");

const s3Context = new S3Controller();

router.get("/s3GetObject", s3Context.getObject);
router.post("/s3PutObject", s3Context.putObject);
router.post("/s3DeleteObject", s3Context.deleteObject);

module.exports = router;
