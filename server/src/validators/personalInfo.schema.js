import { z } from "zod";

export const PersonalInfoSchema = z
  .object({
    fullName: z.string(),
    email: z.string().email().or(z.literal("")),
    phone: z.string(),
    location: z.string(),
  })
  .strict();
