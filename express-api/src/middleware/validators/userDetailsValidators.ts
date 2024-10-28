import { body } from "express-validator";
import { handleValidationErrors } from "./reportErrors";

export const userDetailsValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Invalid email address"),
  body("currentPosition")
    .notEmpty()
    .withMessage("Current position is required"),
  body("resume")
    .optional()
    .custom((value) => value === "" || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value))
    .withMessage("Resume should be a valid URL or an empty string"),
  body("githubLink")
    .optional()
    .custom((value) => value === "" || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value))
    .withMessage("GitHub link should be a valid URL or an empty string"),
  body("linkedinLink")
    .optional()
    .custom((value) => value === "" || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value))
    .withMessage("LinkedIn link should be a valid URL or an empty string"),
  body("twitterLink")
    .optional()
    .custom((value) => value === "" || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value))
    .withMessage("Twitter link should be a valid URL or an empty string"),
  body("languages")
    .optional()
    .isArray()
    .withMessage("Languages should be an array of strings"),
  handleValidationErrors,
];