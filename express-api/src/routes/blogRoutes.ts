// routes/blogRoutes.ts
import express from "express";
import { check } from "express-validator";
import {
  getBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController";
import { authenticateToken } from "../middleware/auth.middleware";
import { handleValidationErrors } from "../middleware/validators/reportErrors";

const router = express.Router();

// GET all blogs (public route)
router.get("/", getBlogs);

// GET a blog by ID (public route)
router.get("/:id", getBlogById);

// POST add a new blog (admin-only route)
router.post(
  "/",
  authenticateToken,
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("content").notEmpty().withMessage("Content is required"),
    check("author").notEmpty().withMessage("Author is required"),
    check("tags")
      .optional()
      .isArray()
      .withMessage("Tags must be an array of strings"),
    handleValidationErrors,
  ],
  addBlog
);

// PUT update a blog by ID (admin-only route)
router.put(
  "/:id",
  authenticateToken,
  [
    check("title").optional().notEmpty().withMessage("Title cannot be empty"),
    check("content")
      .optional()
      .notEmpty()
      .withMessage("Content cannot be empty"),
    check("author").optional().notEmpty().withMessage("Author cannot be empty"),
    check("tags")
      .optional()
      .isArray()
      .withMessage("Tags must be an array of strings"),
    handleValidationErrors,
  ],
  updateBlog
);

// DELETE a blog by ID (admin-only route)
router.delete("/:id", authenticateToken, deleteBlog);

export default router;
