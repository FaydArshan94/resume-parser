import { z } from "zod";

export const ProfessionSchema = z.object({
  currentDesignation: z.string(),
  targetRole: z.string(),
  industry: z.string(),
});