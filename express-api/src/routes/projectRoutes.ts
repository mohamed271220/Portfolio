import express from "express";
import { check } from "express-validator";
import {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import { authenticateToken } from "../middleware/auth.middleware";
import { handleValidationErrors } from "../middleware/validators/reportErrors";

const router = express.Router();

// GET all projects (public route)
router.get("/", getProjects);

// GET a project by ID (public route)
router.get("/:id", getProjectById);

// POST add a new project (admin-only route)
router.post(
  "/",
  authenticateToken,
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("technologies")
      .isArray()
      .withMessage("Technologies must be an array")
      .notEmpty(),
    check("link").optional().isURL().withMessage("Link must be a valid URL"),
    check("images").optional().isArray().withMessage("Images must be an array"),
    check("category").notEmpty().withMessage("Category is required"),
    handleValidationErrors,
  ],
  addProject
);

// PUT update a project by ID (admin-only route)
router.put(
  "/:id",
  authenticateToken,
  [
    check("title").optional().notEmpty().withMessage("Title cannot be empty"),
    check("description")
      .optional()
      .notEmpty()
      .withMessage("Description cannot be empty"),
    check("technologies")
      .optional()
      .isArray()
      .withMessage("Technologies must be an array"),
    check("link").optional().isURL().withMessage("Link must be a valid URL"),
    check("images").optional().isArray().withMessage("Images must be an array"),
    check("category")
      .optional()
      .notEmpty()
      .withMessage("Category cannot be empty"),
    handleValidationErrors,
  ],
  updateProject
);

// DELETE a project by ID (admin-only route)
router.delete("/:id", authenticateToken, deleteProject);

export default router;
