import {
  InitiateAuthCommand,
  ListUsersCommand,
  SignUpCommand,
  SignUpCommandInput,
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
  userName: string,
  email: string,
  role: string,
  isPassword: string
): Promise<any> => {
  const signUpCommandInput: SignUpCommandInput = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
    Password: isPassword,
    UserAttributes: [
      { Name: "name", Value: userName },
      { Name: "email", Value: email },
      { Name: "custom:isPassword", Value: isPassword },
      { Name: "custom:role", Value: role },
    ],
  };

  const cognitoClient = cognitoContext();
  const signUpCommand = new SignUpCommand(signUpCommandInput);
  const poolUser = await cognitoClient.send(signUpCommand);
  return poolUser;
};

export const cognitoLogin = async (
  userName: string,
  isPassword: string
): Promise<any> => {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: userName,
      PASSWORD: isPassword,
    },
  };

  const cognitoClient = cognitoContext();

  const cognitoResponse = await cognitoClient.send(
    new InitiateAuthCommand(params)
  );

  console.log({ cognitoResponse });

  return cognitoResponse;

  // const cognitoClient = cognitoContext();
  // const command = new InitiateAuthCommand(params);
  // const cognitoAuth = cognitoClient.send(command);
  // return cognitoAuth;
};
