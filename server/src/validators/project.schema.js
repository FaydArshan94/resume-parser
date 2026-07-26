import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  url: z.string(),
});