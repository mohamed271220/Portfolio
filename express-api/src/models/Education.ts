import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  institutionName: string;
  logo: string;
  from: Date;
  to: Date;
  link: string;
  description: string;
}

const EducationSchema: Schema = new Schema({
  institutionName: { type: String, required: true },
  logo: { type: String },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  link: { type: String },
  description: { type: String },
});

export default mongoose.model<IEducation>('Education', EducationSchema);
