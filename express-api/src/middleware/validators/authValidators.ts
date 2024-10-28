import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { handleValidationErrors } from "./reportErrors";


export const validateLogin = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];
