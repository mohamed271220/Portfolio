import { Request, Response, NextFunction } from 'express';
import Skill, { ISkill } from '../models/Skill';
import { validationResult } from 'express-validator';
import { CustomError } from '../utils/CustomError';

// Get all skills
export const getSkills = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    next(error);
  }
};

// Get skill by ID
export const getSkillById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) throw new CustomError('Skill not found', 404);
    
    res.status(200).json(skill);
  } catch (error) {
    next(error);
  }
};

// Add a new skill
export const addSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newSkill = new Skill(req.body);
    await newSkill.save();
    res.status(201).json({ message: 'Skill added', newSkill });
  } catch (error) {
    next(error);
  }
};

// Update a skill by ID
export const updateSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (!updatedSkill) throw new CustomError('Skill not found', 404);

    res.status(200).json({ message: 'Skill updated', updatedSkill });
  } catch (error) {
    next(error);
  }
};

// Delete a skill by ID
export const deleteSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) throw new CustomError('Skill not found', 404);

    res.status(200).json({ message: 'Skill deleted' });
  } catch (error) {
    next(error);
  }
};
