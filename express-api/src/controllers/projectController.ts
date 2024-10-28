// controllers/projectController.ts
import { Request, Response, NextFunction } from 'express';
import Project, { IProject } from '../models/Project';
import { CustomError } from '../utils/CustomError';

// Get all projects
export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

// Get project by ID
export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) throw new CustomError('Project not found', 404);
    
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// Add a new project
export const addProject = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({ message: 'Project added', newProject });
  } catch (error) {
    next(error);
  }
};

// Update a project by ID
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (!updatedProject) throw new CustomError('Project not found', 404);

    res.status(200).json({ message: 'Project updated', updatedProject });
  } catch (error) {
    next(error);
  }
};

// Delete a project by ID
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) throw new CustomError('Project not found', 404);

    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};
