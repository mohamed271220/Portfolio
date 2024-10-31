import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "./Category"; // Ensure this path is correct based on your project structure

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  images?: string[];
  category: ICategory["_id"]; // Reference to the Category model
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  link: { type: String },
  github: { type: String },
  images: [{ type: String }],
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // Reference to the Category model
});

export default mongoose.model<IProject>("Project", ProjectSchema);
