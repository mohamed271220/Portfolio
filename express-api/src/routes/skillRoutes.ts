import express from "express";
import { check } from "express-validator";
import {
  getSkills,
  getSkillById,
  addSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController";
import { authenticateToken } from "../middleware/auth.middleware";
import { handleValidationErrors } from "../middleware/validators/reportErrors";

const router = express.Router();

// GET all skills (public route)
router.get("/", getSkills);

// GET a skill by ID (public route)
router.get("/:id", getSkillById);

// POST add a new skill (admin-only route)
router.post(
  "/",
  authenticateToken,
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("logo").notEmpty().withMessage("Logo is required"),
    check("link").optional().isURL().withMessage("Link must be a valid URL"),
    check("bgColor")
      .optional()
      .isHexColor()
      .withMessage("bgColor must be a valid hex color"),
    check("level")
      .optional()
      .isIn(["Beginner", "Intermediate", "Advanced"])
      .withMessage("Level must be one of Beginner, Intermediate, or Advanced"),
    check("category")
      .optional()
      .isString()
      .withMessage("Category must be a string"),
    handleValidationErrors,
  ],
  addSkill
);

// PUT update a skill by ID (admin-only route)
router.put(
  "/:id",
  authenticateToken,
  [
    check("name").optional().notEmpty().withMessage("Name cannot be empty"),
    check("logo").optional().notEmpty().withMessage("Logo cannot be empty"),
    check("link").optional().isURL().withMessage("Link must be a valid URL"),
    check("bgColor")
      .optional()
      .isHexColor()
      .withMessage("bgColor must be a valid hex color"),
    check("level")
      .optional()
      .isIn(["Beginner", "Intermediate", "Advanced"])
      .withMessage("Level must be one of Beginner, Intermediate, or Advanced"),
    check("category")
      .optional()
      .isString()
      .withMessage("Category must be a string"),
    handleValidationErrors,
  ],
  updateSkill
);

// DELETE a skill by ID (admin-only route)
router.delete("/:id", authenticateToken, deleteSkill);

export default router;
