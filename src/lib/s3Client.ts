import { S3Client } from "@aws-sdk/client-s3";
import { awsConfig } from "../config/aws";

export const s3Context = new S3Client(awsConfig);
