import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";

import resumeRoutes from "./routes/resume.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

const app = express();

// Hide Express signature
app.disable("x-powered-by");

// Security headers
app.use(helmet());

// Compress responses
app.use(compression());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Parse JSON safely
app.use(
  express.json({
    limit: "100kb",
  }),
);

// Enable CORS
app.use(
  cors({
    origin: [
      "https://resume-parser-roan.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// Rate limiting
app.use("/api", apiLimiter);

// Routes
app.use("/api/resume", resumeRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;