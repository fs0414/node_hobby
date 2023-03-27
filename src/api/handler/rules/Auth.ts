import { check, validationResult } from "express-validator";

export const authRegisterRules = [
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
    .withMessage("Invalid email"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isLength({ min: 5 })
    .withMessage("password mast be at least 5 characters")
    .isLength({ max: 50 })
    .withMessage("name mast be at largest 50 characters"),
  check("role").not().isEmpty().withMessage("role is required"),
];
