import ai from "../config/gemini.js";
import { ResumeJsonSchema } from "../schemas/resume.schema.json.js";
import { ResumeSchema } from "../validators/resume.schema.js";
import { normalizeResume } from "./resumeNormalize.service.js";

export const parseResume = async (resumeText) => {
  const prompt = `
You are an expert resume parser.

Your first task is to determine whether the provided document is a resume or CV.

Rules:
- If the document IS a resume or CV, set "isResume" to true and extract all information.
- If the document is NOT a resume or CV, set "isResume" to false and leave every other field empty.
- Return ONLY valid JSON matching the provided schema.
- Do not invent information.
- If a field is missing, return an empty string, empty array, or empty object as appropriate.
- Preserve the original wording whenever possible.

Document:

${resumeText}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: ResumeJsonSchema,
    },
  });

  const parsed = JSON.parse(response.text);

  if (typeof parsed.isResume !== "boolean") {
    const error = new Error(
      "Unable to determine whether the uploaded document is a resume.",
    );
    error.statusCode = 400;
    throw error;
  }

  if (!parsed.isResume) {
    const error = new Error("The uploaded document is not a valid resume.");
    error.statusCode = 400;
    throw error;
  }

  const { isResume, ...resumeData } = parsed;

  const normalizedResume = normalizeResume(resumeData);

  return ResumeSchema.parse(normalizedResume);
};
