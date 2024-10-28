import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  logo: string;
  link: string;
  bgColor?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  category?: string;
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  link: { type: String },
  bgColor: { type: String, default: '#000000' },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  category: { type: String }
});

export default mongoose.model<ISkill>('Skill', SkillSchema);
