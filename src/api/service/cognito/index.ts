import {
  ListUsersCommand,
  SignUpCommand,
  SignUpCommandInput,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { cognitoContext } from "../../../lib/cognitoClient";
import dotenv from "dotenv";
dotenv.config();

export const poolUsersGet = async () => {
  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID || "",
  };
  const cognitoClient = cognitoContext();
  const command = new ListUsersCommand(params);
  const poolUsers = await cognitoClient.send(command);
  return poolUsers;
};

export const registerPoolUser = async (
  name: string,
  email: string,
  role: string,
  hashedPassword: string
): Promise<any> => {
  const signUpCommandInput: SignUpCommandInput = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
    Password: hashedPassword,
    UserAttributes: [
      { Name: "name", Value: name },
      { Name: "email", Value: email },
      { Name: "custom:isPassword", Value: hashedPassword },
      { Name: "custom:role", Value: role },
    ],
  };

  const cognitoClient = cognitoContext();
  const signUpCommand = new SignUpCommand(signUpCommandInput);
  const poolUser = await cognitoClient.send(signUpCommand);
  return poolUser;
};

// export const cognitoLogin = (email: string, isPassword: string) => {
//   const params = {
//     AuthFlow: "EMAIL_PASSWORD_FLOW",
//     ClientId: process.env.COGNITO_CLIENT_ID,
//     AuthParameters: {
//       USERNAME: email,
//       PASSWORD: isPassword,
//     },
//   };

//   const cognitoClient = cognitoContext();
//   const command = new InitiateAuthCommand(params);
//   const cognitoAuth = cognitoClient.send(command);
//   return cognitoAuth;
// };
