import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import dotenv from "dotenv";
dotenv.config();

import { awsConfig } from "./aws";

// export const cognitoClient = new CognitoIdentityProviderClient(awsConfig);

export const cognitoContext = () => {
  const cognitoIdentityProvider = new CognitoIdentityProviderClient(awsConfig);
  return cognitoIdentityProvider;
};
