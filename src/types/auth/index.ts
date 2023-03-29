import { Role } from "@prisma/client";

export type typeRegisterReq = {
  body: {
    name: string;
    email: string;
    password: string;
    role: Role;
  };
};
