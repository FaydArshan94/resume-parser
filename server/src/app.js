import express from "express";
import resumeRoutes from "./routes/resume.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use("/api/resume", resumeRoutes);


app.use(errorHandler)

export default app;
