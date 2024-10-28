import mongoose from "mongoose";
import dotenv from "dotenv";
import UserDetails from "../models/UserDetails";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    // Check if UserDetails document exists; create if not
    const existingUserDetails = await UserDetails.findOne();
    if (!existingUserDetails) {
      await UserDetails.create({
        name: "Mohamed Magdy",
        email: "mohamed.magdy.business4@gmail.com ",
        currentPosition: "Full Stack Developer",
        resume: "",
        githubLink: "",
        linkedinLink: "",
        twitterLink: "",
        profilePicture: "",
        bio: "",
        location: "",
        languages: [],
      });
      console.log("Initialized UserDetails document");
    }
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
