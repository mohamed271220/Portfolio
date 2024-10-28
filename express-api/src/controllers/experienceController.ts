import { Request, Response, NextFunction } from 'express';
import Experience, { IExperience } from '../models/Experience';
import { validationResult } from 'express-validator';
import { CustomError } from '../utils/CustomError';

// Get all experiences
export const getExperiences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (error) {
    next(error);
  }
};

// Add new experience
export const addExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newExperience = new Experience(req.body);
    await newExperience.save();
    res.status(201).json({ message: 'Experience added', newExperience });
  } catch (error) {
    next(error);
  }
};

// Update experience by ID
export const updateExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (!updatedExperience) throw new CustomError('Experience not found', 404);

    res.status(200).json({ message: 'Experience updated', updatedExperience });
  } catch (error) {
    next(error);
  }
};

// Delete experience by ID
export const deleteExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExperience) throw new CustomError('Experience not found', 404);

    res.status(200).json({ message: 'Experience deleted' });
  } catch (error) {
    next(error);
  }
};
