import express from 'express';
import { check } from 'express-validator';
import {
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/educationController';
import { authenticateToken } from '../middleware/auth.middleware';
import { handleValidationErrors } from '../middleware/validators/reportErrors';

const router = express.Router();

// GET all education records (public route)
router.get('/', getEducation);

// POST add a new education record (admin-only route)
router.post(
  '/',
  authenticateToken,
  [
    check('institutionName').notEmpty().withMessage('Institution name is required'),
    check('from').isDate().withMessage('From date is required and must be a valid date'),
    check('to').isDate().withMessage('To date is required and must be a valid date'),
    check('description').optional().isString(),
    check('link').optional().isURL().withMessage('Link must be a valid URL'),
    handleValidationErrors,
],
  addEducation
);

// PUT update an education record by ID (admin-only route)
router.put(
  '/:id',
  authenticateToken,
  [
    check('institutionName').optional().notEmpty().withMessage('Institution name cannot be empty'),
    check('from').optional().isDate().withMessage('From date must be a valid date'),
    check('to').optional().isDate().withMessage('To date must be a valid date'),
    check('description').optional().isString(),
    check('link').optional().isURL().withMessage('Link must be a valid URL'),
    handleValidationErrors,
],
  updateEducation
);

// DELETE an education record by ID (admin-only route)
router.delete('/:id', authenticateToken, deleteEducation);

export default router;
