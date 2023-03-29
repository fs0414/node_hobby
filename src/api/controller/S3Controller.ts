import { Request, Response } from "express";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Context } from "../../lib/s3Client";
const dotenv = require("dotenv");
dotenv.config();

export class S3Controller {
  async getObject(_res: Request, res: Response): Promise<void> {
    const command = new GetObjectCommand({
      Bucket: "node-hobbys-bucket-01",
      Key: "4th.html",
    });
    try {
      const response = await s3Context.send(command);
      const str = await response.Body?.transformToString();
      res.send(str);
    } catch (error) {
      console.log(error);
    }
  }
}
