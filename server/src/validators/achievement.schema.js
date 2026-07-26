import { z } from "zod";

export const AchievementSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().optional(),
});