import { check, body } from "express-validator";
import { prismaContext } from "../../../lib/prismaContext";

export const authRegisterRule = [
  check("userName")
    .not()
    .isEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name mast be at least 3 characters")
    .isLength({ max: 255 })
    .withMessage("name mast be at largest 3 characters")
    .custom(async (value) => {
      const existedUser = await prismaContext.user.findUnique({
        where: {
          userName: value,
        },
      });
      if (existedUser) {
        throw new Error("userName already exists");
      }
    }),
  check("email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (value) => {
      const existedUser = await prismaContext.user.findUnique({
        where: {
          email: value,
        },
      });
      if (existedUser) {
        throw new Error("email already exists");
      }
    }),
  body("isPassword")
    .notEmpty()
    .withMessage("isPassword is required")
    .isLength({ min: 6 })
    .withMessage("isPassword mast be at least 6 characters")
    .isLength({ max: 255 })
    .withMessage("name mast be at largest 50 characters"),
  check("role").not().isEmpty().withMessage("role is required"),
];

export const authLoginRule = [
  check("userName")
    .not()
    .isEmpty()
    .withMessage("userName is required")
    .isLength({ min: 3 })
    .withMessage("userName mast be at least 3 characters")
    .isLength({ max: 255 })
    .withMessage("userName mast be at largest 3 characters"),
  body("isPassword")
    .not()
    .notEmpty()
    .withMessage("isPassword is required")
    .isLength({ min: 6 })
    .withMessage("isPassword mast be at least 6 characters")
    .isLength({ max: 255 })
    .withMessage("name mast be at largest 50 characters"),
];
