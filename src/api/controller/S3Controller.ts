import { Request, Response } from "express";
import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  // CreateBucketCommand,
} from "@aws-sdk/client-s3";
import { s3Context } from "../../lib/s3Client";
const dotenv = require("dotenv");
dotenv.config();

export class S3Controller {
  async getBucket(_req: Request, _res: Response): Promise<void> {}

  async getObject(req: Request, res: Response): Promise<void> {
    const { bucketName, objectName } = req.body;
    const command = new GetObjectCommand({
      Bucket: `${bucketName}`,
      Key: `${objectName}`,
    });
    try {
      const response = await s3Context.send(command);
      const str = await response.Body?.transformToString();
      res.send(str);
    } catch (error) {
      console.log(error);
    }
  }

  async putBucket(_req: Request, _res: Response): Promise<void> {}

  async putObject(req: Request, res: Response): Promise<void> {
    const { bucketName, objectName, body } = req.body;
    const command = new PutObjectCommand({
      Bucket: `${bucketName}`,
      Key: `${objectName}`,
      Body: `${body}`,
    });

    try {
      const response = await s3Context.send(command);
      res.status(201).json({
        message: "create s3 object",
        response,
      });
    } catch (error: any) {
      res.status(4001).json({
        message: error.message,
      });
    }
  }

  async deleteBucket(_req: Request, _res: Response): Promise<void> {}

  async deleteObject(req: Request, res: Response): Promise<void> {
    const { bucketName, objectName } = req.body;
    const command = new DeleteObjectCommand({
      Bucket: `${bucketName}`,
      Key: `${objectName}`,
    });
    try {
      const response = await s3Context.send(command);
      res.status(201).json({
        message: "s3 object delete",
        response,
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message,
      });
    }
  }
}
// nodeBucket
// node-hobbys-bucket-01

// putObject
// {
//   "bucketName": "sampleBucketName",
//   "objectName": "sampleObjectName",
//   "body": "sampleBody"
