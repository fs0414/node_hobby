import { check, body } from "express-validator";
import { prismaContext } from "../../context/prismaContext";

export const authRegisterRule = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name mast be at least 3 characters")
    .isLength({ max: 255 })
    .withMessage("name mast be at largest 3 characters"),
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
  // body("email")
  //   .notEmpty()
  //   .withMessage("email is required")
  //   .isEmail()
  //   .withMessage("Invalid email"),
  body("isPassword")
    .not()
    .notEmpty()
    .withMessage("isPassword is required")
    .isLength({ min: 6 })
    .withMessage("isPassword mast be at least 6 characters")
    .isLength({ max: 255 })
    .withMessage("name mast be at largest 50 characters"),
];
