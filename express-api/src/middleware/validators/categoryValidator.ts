import { body, param } from "express-validator";
import { handleValidationErrors } from "./reportErrors";

export const validateCategory = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").optional().isString(),
  handleValidationErrors,
];

export const validateCategoryId = [
  param("id").isMongoId().withMessage("Invalid ID format"),
  handleValidationErrors,
];
