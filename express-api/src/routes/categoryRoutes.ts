import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateCategory, validateCategoryId } from '../middleware/validators/categoryValidator';



const router = express.Router();

router.get('/', authenticateToken, getAllCategories);
router.get('/:id', authenticateToken, validateCategoryId, getCategoryById);
router.post('/', authenticateToken, validateCategory, createCategory);
router.put('/:id', authenticateToken, validateCategoryId, validateCategory, updateCategory);
router.delete('/:id', authenticateToken, validateCategoryId, deleteCategory);

export default router;
