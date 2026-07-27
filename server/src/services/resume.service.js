import { parseResume } from "./resumeParser.service.js";
import { extractFile } from "./textExtraction.service.js";
import { Resume } from "../models/resume.model.js";

export const processResume = async (file) => {
  if (!file) {
    const error = new Error("Resume file is required.");
    error.statusCode = 400;
    throw error;
  }

  const extractedText = await extractFile(file);

  const parsedResume = await parseResume(extractedText);

  const savedResume = await Resume.create({
    originalFileName: file.originalname,
    mimeType: file.mimetype,
    fileSize: file.size,
    parsedData: parsedResume,
  });
  return savedResume;
};
