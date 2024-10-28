import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  tags?: string[];
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
});

export default mongoose.model<IBlog>('Blog', BlogSchema);
