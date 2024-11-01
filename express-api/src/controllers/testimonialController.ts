import { Request, Response, NextFunction } from "express";
import Testimonial, { ITestimonial } from "../models/Testimonial";
import { validationResult } from "express-validator";
import { CustomError } from "../utils/CustomError";

// Get all testimonials
export const getTestimonials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    next(error);
  }
};

// Get testimonial by ID
export const getTestimonialById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) throw new CustomError("Testimonial not found", 404);

    res.status(200).json(testimonial);
  } catch (error) {
    next(error);
  }
};

// Add a new testimonial
export const addTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTestimonial = new Testimonial({
      ...req.body,
      profilePicture: req.body.profilePicture[0],
    });
    await newTestimonial.save();
    res.status(201).json({ message: "Testimonial added", newTestimonial });
  } catch (error) {
    next(error);
  }
};

// Update a testimonial by ID
export const updateTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { ...req.body, profilePicture: req.body.profilePicture[0] },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    if (!updatedTestimonial)
      throw new CustomError("Testimonial not found", 404);

    res
      .status(200)
      .json({ message: "Testimonial updated", updatedTestimonial });
  } catch (error) {
    next(error);
  }
};

// Delete a testimonial by ID
export const deleteTestimonial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTestimonial)
      throw new CustomError("Testimonial not found", 404);

    res.status(200).json({ message: "Testimonial deleted" });
  } catch (error) {
    next(error);
  }
};
