import { parseResume } from "./parser.service.js";
import { extractFile } from "./textExtraction.service.js";

export const processResume = async (file) => {
  if (!file) {
    const error = new Error("Resume file is required.");
    error.statusCode = 400;
    throw error;
  }

  const extractedText = await extractFile(file);


  const parsedResume = await parseResume(extractedText);

  return parsedResume;
};
