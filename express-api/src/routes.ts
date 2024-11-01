import express from "express";
import authRoutes from "./routes/auth.route";
import blogRoutes from "./routes/blogRoutes";
import uploadRoutes from "./routes/upload.route";
import certificationRoutes from "./routes/certificationRoutes";
import userRoutes from "./routes/userDetailsRoutes";
import educationRoutes from "./routes/educationRoutes";
import experienceRoutes from "./routes/experienceRoutes";
import projectRoutes from "./routes/projectRoutes";
import skillRoutes from "./routes/skillRoutes";
import testimonialRoutes from "./routes/testimonialRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/blogs", blogRoutes);
router.use("/media", uploadRoutes);
router.use("/certifications", certificationRoutes);
router.use("/me", userRoutes);
router.use("/educations", educationRoutes);
router.use("/experiences", experienceRoutes);
router.use("/projects", projectRoutes);
router.use("/skills", skillRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/categories", categoryRoutes);

export default router;
