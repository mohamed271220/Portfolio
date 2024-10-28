import { Request, Response, NextFunction } from 'express';
import Certification, { ICertification } from '../models/Certification';
import { validationResult } from 'express-validator';
import { CustomError } from '../utils/CustomError';

// Get all certifications
export const getCertifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const certifications = await Certification.find().sort({ dateIssued: -1 });
    res.status(200).json(certifications);
  } catch (error) {
    next(error);
  }
};

// Get certification by ID
export const getCertificationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) throw new CustomError('Certification not found', 404);

    res.status(200).json(certification);
  } catch (error) {
    next(error);
  }
};

// Add a new certification
export const addCertification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCertification = new Certification({
      ...req.body,
      dateIssued: new Date(req.body.dateIssued),
    });

    await newCertification.save();
    res.status(201).json({ message: 'Certification added', newCertification });
  } catch (error) {
    next(error);
  }
};

// Update a certification by ID
export const updateCertification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedCertification = await Certification.findByIdAndUpdate(
      req.params.id,
      { ...req.body, dateIssued: new Date(req.body.dateIssued) },
      { new: true, useFindAndModify: false }
    );

    if (!updatedCertification) throw new CustomError('Certification not found', 404);

    res.status(200).json({ message: 'Certification updated', updatedCertification });
  } catch (error) {
    next(error);
  }
};

// Delete a certification by ID
export const deleteCertification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedCertification = await Certification.findByIdAndDelete(req.params.id);
    if (!deletedCertification) throw new CustomError('Certification not found', 404);

    res.status(200).json({ message: 'Certification deleted' });
  } catch (error) {
    next(error);
  }
};
