import ai from "../config/gemini.js";
import { ResumeJsonSchema } from "../schemas/resume.schema.json.js";
import { ResumeSchema } from "../validators/resume.schema.js";
import { normalizeResume } from "./resumeNormalize.service.js";

export const parseResume = async (resumeText) => {
  const prompt = `
You are an expert resume parser.

Extract all information from the resume.

Rules:
- Return only valid JSON.
- Do not invent information.
- If a field is missing, return an empty string, empty array, or empty object as appropriate.
- Preserve the original wording whenever possible.

Resume:

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

  console.log(parsed)

const normalizedResume = normalizeResume(parsed);

const validatedResume = ResumeSchema.parse(normalizedResume);

return validatedResume;
};