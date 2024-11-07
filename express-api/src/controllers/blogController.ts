import { Request, Response, NextFunction } from "express";
import Blog, { IBlog } from "../models/Blog";
import { validationResult } from "express-validator";
import { CustomError } from "../utils/CustomError";
import sanitizeHtml from "sanitize-html";
import { uploadBase64ImageToS3 } from "../middleware/file-upload";

// Helper function to replace base64 images with S3 URLs
const replaceBase64Images = async (content: string) => {
  const base64Regex =
    /<img\s+src="data:image\/(png|jpeg|jpg);base64,([^"]+)"[^>]*>/g;
  let match;
  let updatedContent = content;

  while ((match = base64Regex.exec(content)) !== null) {
    const base64Data = match[2];
    console.log("Base64 Data:", base64Data.substring(0, 30)); // Log first 30 characters of base64 data
    const s3Url = await uploadBase64ImageToS3(base64Data);
    console.log("S3 URL:", s3Url); // Log S3 URL
    updatedContent = updatedContent.replace(match[0], `<img src="${s3Url}" />`);
  }

  console.log("Updated Content:", updatedContent); // Log updated content
  return updatedContent;
};

// Get all blogs
export const getBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

// Get blog by ID
export const getBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new CustomError("Blog not found", 404);

    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

// Add a new blog
export const addBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log("req.body", req.body);

    // Replace base64 images with S3 URLs
    const contentWithS3Urls = await replaceBase64Images(req.body.content);
    console.log("Content with S3 URLs:", contentWithS3Urls);

    // Sanitize the content
    const sanitizedContent = sanitizeHtml(contentWithS3Urls, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title"], // Allow img tag attributes
      },
      selfClosing: ["img"], // Allow img tags to be self-closing
    });

    console.log(sanitizedContent);

    // console.log(req.files);

    // Create the blog object
    const newBlog = {
      author: req.body.author,
      content: sanitizedContent,
      tags: req.body.tags,
      title: req.body.title,
    };

    // Save the blog to the database (assuming you have a Blog model)
    const savedBlog = await Blog.create(newBlog);

    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
};
// Update a blog by ID
export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new CustomError("Blog not found", 404);

    // Replace base64 images with S3 URLs
    if (req.body.content && req.body.content !== blog.content) {
      req.body.content = await replaceBase64Images(req.body.content);
      req.body.content = sanitizeHtml(req.body.content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ["src", "alt", "title"], // Allow img tag attributes
        },
        selfClosing: ["img"], // Allow img tags to be self-closing
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, useFindAndModify: false }
    );

    if (!updatedBlog) throw new CustomError("Blog not found", 404);

    res.status(200).json({ message: "Blog updated", updatedBlog });
  } catch (error) {
    next(error);
  }
};

// Delete a blog by ID
export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) throw new CustomError("Blog not found", 404);

    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    next(error);
  }
};
