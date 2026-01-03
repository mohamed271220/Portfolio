import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  companyName: string;
  logo: string;
  from: Date;
  to: Date;
  current: boolean;
  link: string;
  description: string;
}

const ExperienceSchema: Schema = new Schema({
  companyName: { type: String, required: true },
  logo: { type: String },
  from: { type: Date, required: true },
  to: { type: Date },
  current: { type: Boolean, default: false },
  link: { type: String },
  description: { type: String },
});

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
