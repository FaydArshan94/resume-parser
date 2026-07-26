import express from "express";
import resumeRoutes from "./routes/resume.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use("/api/resume", resumeRoutes);

app.use(errorHandler);

export default app;
