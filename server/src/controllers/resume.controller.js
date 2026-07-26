import asyncHandler from "../middlewares/asyncHandler.js";
import { successResponse } from "../utils/response.js";
import { processResume } from "../services/resume.service.js";

export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    const error = new Error("Resume file is required");
    error.statusCode = 400;
    throw error;
  }

  const result = await processResume(req.file);

  console.log(result)

  return successResponse(res, result, "Resume parsed successfully", 201);
});


