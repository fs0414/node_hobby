const dotenv = require("dotenv");
dotenv.config();

export const awsConfig = {
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET_KEY || "",
  },
};
