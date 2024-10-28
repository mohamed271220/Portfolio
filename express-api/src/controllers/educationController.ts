import { Request, Response, NextFunction } from 'express';
import Education, { IEducation } from '../models/Education';
import { validationResult } from 'express-validator';
import { CustomError } from '../utils/CustomError';
import { log } from 'console';

// Get all education records
export const getEducation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const educationRecords = await Education.find();
    res.status(200).json(educationRecords);
  } catch (error) {
    next(error);
  }
};

// Add a new education record
export const addEducation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newEducation = new Education({...req.body, logo: req.body.logo[0]});
    await newEducation.save();
    res.status(201).json({ message: 'Education record added', newEducation });
  } catch (error) {
    next(error);
  }
};

// Update education record by ID
export const updateEducation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(req.params.id, {...req.body, logo: req.body.logo[0]}, {
      new: true,
      useFindAndModify: false,
    });
    if (!updatedEducation) throw new CustomError('Education record not found', 404);

    res.status(200).json({ message: 'Education record updated', updatedEducation });
  } catch (error) {
    next(error);
  }
};

// Delete education record by ID
export const deleteEducation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);
    if (!deletedEducation) throw new CustomError('Education record not found', 404);

    res.status(200).json({ message: 'Education record deleted' });
  } catch (error) {
    next(error);
  }
};
