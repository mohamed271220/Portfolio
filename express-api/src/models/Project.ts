import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  images?: string[]; // URLs for project images/screenshots
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  link: { type: String },
  images: [{ type: String }]
});

export default mongoose.model<IProject>('Project', ProjectSchema);
