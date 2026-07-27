import asyncHandler from "../middlewares/asyncHandler.js";
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

export const getResumeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const resume = await Resume.findById(id).lean();

  if (!resume) {
    const error = new Error("Resume not found.");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Resume fetched successfully",
    data: resume,
  });
});

export const getAllResumes = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(20, Math.max(1, Number(req.query.limit) || 10));

  const [resumes, total] = await Promise.all([
    Resume.find()
      .select(
        "_id createdAt parsedData.personalInfo.fullName parsedData.profession.currentDesignation"
      )
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),

    Resume.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    message: "Resumes fetched successfully",
    resumes,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  });
});

export const deleteResume = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const resume = await Resume.findByIdAndDelete(id);

  if (!resume) {
    const error = new Error("Resume not found.");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: "Resume deleted successfully.",
  });
});

export const deleteAllResume = asyncHandler(async (req, res) => {
  const result = await Resume.deleteMany({});

  res.status(200).json({
    success: true,
    message: `${result.deletedCount} resume(s) deleted successfully.`,
    deletedCount: result.deletedCount,
  });
});