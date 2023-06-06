import { S3Client } from "@aws-sdk/client-s3";
import { awsConfig } from "./aws";

export const s3Context = new S3Client(awsConfig);
