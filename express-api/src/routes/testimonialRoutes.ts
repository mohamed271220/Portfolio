import express from "express";
import { check } from "express-validator";
import {
  getTestimonials,
  getTestimonialById,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController";
import { authenticateToken } from "../middleware/auth.middleware";
import { handleValidationErrors } from "../middleware/validators/reportErrors";

const router = express.Router();

// GET all testimonials (public route)
router.get("/", getTestimonials);

// GET a testimonial by ID (public route)
router.get("/:id", getTestimonialById);

// POST add a new testimonial (admin-only route)
router.post(
  "/",
  authenticateToken,
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("position").notEmpty().withMessage("Position is required"),
    check("profilePicture")
      .optional()
      .isURL()
      .withMessage("Profile picture must be a valid URL"),
    check("content").notEmpty().withMessage("Content is required"),
    handleValidationErrors,
  ],
  addTestimonial
);

// PUT update a testimonial by ID (admin-only route)
router.put(
  "/:id",
  authenticateToken,
  [
    check("name").optional().notEmpty().withMessage("Name cannot be empty"),
    check("position")
      .optional()
      .notEmpty()
      .withMessage("Position cannot be empty"),
    check("profilePicture")
      .optional()
      .isURL()
      .withMessage("Profile picture must be a valid URL"),
    check("content")
      .optional()
      .notEmpty()
      .withMessage("Content cannot be empty"),
    handleValidationErrors,
  ],
  updateTestimonial
);

// DELETE a testimonial by ID (admin-only route)
router.delete("/:id", authenticateToken, deleteTestimonial);

export default router;
