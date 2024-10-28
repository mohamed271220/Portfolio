import express from "express";
import { check } from "express-validator";
import {
  getCertifications,
  getCertificationById,
  addCertification,
  updateCertification,
  deleteCertification,
} from "../controllers/certificationController";
import { authenticateToken } from "../middleware/auth.middleware";
import { handleValidationErrors } from "../middleware/validators/reportErrors";

const router = express.Router();

// GET all certifications (public route)
router.get("/", getCertifications);

// GET a certification by ID (public route)
router.get("/:id", getCertificationById);

// POST add a new certification (admin-only route)
router.post(
  "/",
  authenticateToken,
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("issuedBy").notEmpty().withMessage("Issued By is required"),
    check("dateIssued")
      .isISO8601()
      .toDate()
      .withMessage("Date Issued must be a valid date"),
    check("photo").optional().isURL().withMessage("Photo must be a valid URL"),
    check("link").optional().isURL().withMessage("Link must be a valid URL"),
    handleValidationErrors,
  ],
  addCertification
);

// PUT update a certification by ID (admin-only route)
router.put(
  "/:id",
  authenticateToken,
  [
    check("title").optional().notEmpty().withMessage("Title cannot be empty"),
    check("issuedBy")
      .optional()
      .notEmpty()
      .withMessage("Issued By cannot be empty"),
    check("dateIssued")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("Date Issued must be a valid date"),
    check("photo").optional().isURL().withMessage("Photo must be a valid URL"),
    check("link").optional().isURL().withMessage("Link must be a valid URL"),
    handleValidationErrors,
  ],
  updateCertification
);

// DELETE a certification by ID (admin-only route)
router.delete("/:id", authenticateToken, deleteCertification);

export default router;
