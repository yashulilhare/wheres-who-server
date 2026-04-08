import { body } from "express-validator";

export const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username cannot be empty")
    .isLength({ min: 3, max: 20 })
    .withMessage("username should be between 2 and 15 characters"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password field cannot be empty")
    .isStrongPassword({
      minLength: 5,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      "password should contain at least 1 lowercase, 1 uppercase, 1 number. And should be more than 5 character",
    ),
];
