import mongoose, { Schema, Document } from "mongoose";

export interface IUserDetails extends Document {
  name: string;
  email: string;
  currentPosition: string;
  resume: string;
  githubLink: string;
  linkedinLink: string;
  twitterLink: string;
  profilePicture?: string;
  bio?: string;
  location?: string;
  languages?: string[];
}

const UserDetailsSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  currentPosition: { type: String, required: true },
  resume: { type: String },
  githubLink: { type: String },
  linkedinLink: { type: String },
  twitterLink: { type: String },
  profilePicture: { type: String },
  bio: { type: String },
  location: { type: String },
  languages: [{ type: String }],
});

export default mongoose.model<IUserDetails>("UserDetails", UserDetailsSchema);
