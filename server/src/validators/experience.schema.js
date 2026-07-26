import { z } from "zod";

export const ExperienceSchema = z
  .object({
    company: z.string(),
    designation: z.string(),
    employmentType: z.string(),
    industry: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    isCurrent: z.boolean(),
    description: z.string(),
    skillsUsed: z.array(z.string()),
  })
  .strict();
