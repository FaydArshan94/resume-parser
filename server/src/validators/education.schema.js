import { z } from "zod";

export const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  startYear: z.string(),
  endYear: z.string(),
});