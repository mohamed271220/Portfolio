import mongoose, { Schema, Document } from "mongoose";

export interface ICertification extends Document {
  title: string;
  issuedBy: string;
  dateIssued: Date;
  photo?: string;
  link?: string;
}

const CertificationSchema: Schema = new Schema({
  title: { type: String, required: true },
  issuedBy: { type: String, required: true },
  dateIssued: { type: Date, required: true },
  photo: { type: String },
  link: { type: String },
});

export default mongoose.model<ICertification>(
  "Certification",
  CertificationSchema
);
