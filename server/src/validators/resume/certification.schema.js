import { z } from "zod";

export const CertificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  issueDate: z.string(),
});