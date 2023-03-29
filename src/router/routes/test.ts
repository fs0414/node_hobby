// import { S3Client } from "@aws-sdk/client-s3";
import express from "express";
const router = express.Router();
import { S3Controller } from "../../api/controller/S3Controller";

const s3Context = new S3Controller();

router.get("/s3GetObject", s3Context.getObject);

module.exports = router;
