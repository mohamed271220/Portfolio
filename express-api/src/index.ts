import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error-handler";

// routes imports
import routes from "./routes";

dotenv.config();

import connectDB from "./config/database";
import swaggerRouter from "./config/swagger";

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true, // 
  })
);
app.use(cookieParser());

// Connect to the database
connectDB();

// Routes
app.use("/api/v1", routes);

// Swagger docs route
app.use("/api/v1/official-docs/express-api-docs", swaggerRouter);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;