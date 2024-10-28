import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  position: string;
  profilePicture?: string;
  content: string;
}

const TestimonialSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  profilePicture: { type: String },
  content: { type: String, required: true },
});

export default mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
