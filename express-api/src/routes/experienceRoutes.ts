import express from "express";
import { check } from "express-validator";
import {
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController";
import { authenticateToken } from "../middleware/auth.middleware";
import { handleValidationErrors } from "../middleware/validators/reportErrors";

const router = express.Router();

// GET all experiences (public route)
router.get("/", getExperiences);

// POST add new experience (admin-only route)
router.post(
  "/",
  authenticateToken,
  [
    check("companyName").notEmpty().withMessage("Company name is required"),
    check("from")
      .isDate()
      .withMessage("From date is required and must be a valid date"),
    check("to")
      .isDate()
      .withMessage("To date is required and must be a valid date"),
    check("description").optional().isString(),
    check("link").optional().isURL().withMessage("Link must be a valid URL"),
    handleValidationErrors,
  ],
  addExperience
);

// PUT update experience by ID (admin-only route)
router.put(
  "/:id",
  authenticateToken,
  [
    check("companyName")
      .optional()
      .notEmpty()
      .withMessage("Company name cannot be empty"),
    check("from")
      .optional()
      .isDate()
      .withMessage("From date must be a valid date"),
    check("to").optional().isDate().withMessage("To date must be a valid date"),
    check("description").optional().isString(),
    check("link").optional().isURL().withMessage("Link must be a valid URL"),
    handleValidationErrors,
  ],
  updateExperience
);

// DELETE experience by ID (admin-only route)
router.delete("/:id", authenticateToken, deleteExperience);

export default router;
