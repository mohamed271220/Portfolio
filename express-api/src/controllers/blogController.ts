import { Request, Response, NextFunction } from 'express';
import Blog, { IBlog } from '../models/Blog';
import { validationResult } from 'express-validator';
import { CustomError } from '../utils/CustomError';
import sanitizeHtml from 'sanitize-html';

// Get all blogs
export const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

// Get blog by ID
export const getBlogById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new CustomError('Blog not found', 404);
    
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

// Add a new blog
export const addBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Sanitize content to prevent injection attacks
    const sanitizedContent = sanitizeHtml(req.body.content);
    
    const newBlog = new Blog({
      ...req.body,
      content: sanitizedContent,
      createdAt: new Date(),
    });
    
    await newBlog.save();
    res.status(201).json({ message: 'Blog added', newBlog });
  } catch (error) {
    next(error);
  }
};

// Update a blog by ID
export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Sanitize content to prevent injection attacks
    const sanitizedContent = sanitizeHtml(req.body.content);

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { ...req.body, content: sanitizedContent },
      { new: true, useFindAndModify: false }
    );
    
    if (!updatedBlog) throw new CustomError('Blog not found', 404);

    res.status(200).json({ message: 'Blog updated', updatedBlog });
  } catch (error) {
    next(error);
  }
};

// Delete a blog by ID
export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) throw new CustomError('Blog not found', 404);

    res.status(200).json({ message: 'Blog deleted' });
  } catch (error) {
    next(error);
  }
};
