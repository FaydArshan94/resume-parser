import asyncHandler from "../middlewares/asyncHandler.js";
import { successResponse } from "../utils/response.js";
import { processResume } from "../services/resume.service.js";
import { Resume } from "../models/resume.model.js";

export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    const error = new Error("Resume file is required");
    error.statusCode = 400;
    throw error;
  }

  const savedResume = await processResume(req.file);


  res.status(201).json({
    success: true,
    message: "Resume parsed successfully",
    data: savedResume,
  });
});

export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id).lean();

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume fetched successfully",
      data: resume,
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch resume",
    });
  }
};

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 }).lean();

    return res.status(200).json({
      success: true,
      message: "Resumes fetched successfully",
      data: resumes,
    });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch resumes",
    });
  }
};