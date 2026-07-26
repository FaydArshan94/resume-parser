import { z } from "zod";

import { PersonalInfoSchema } from "./personalInfo.schema.js";
import { ProfessionSchema } from "./profession.schema.js";
import { SkillsSchema } from "./skills.schema.js";
import { ExperienceSchema } from "./experience.schema.js";
import { EducationSchema } from "./education.schema.js";
import { ProjectSchema } from "./project.schema.js";
import { CertificationSchema } from "./certification.schema.js";
import { AchievementSchema } from "./achievement.schema.js";

const SocialLinksSchema = z.object({
  linkedin: z.string(),
  github: z.string(),
  portfolio: z.string(),
  website: z.string(),
  leetcode: z.string(),
  kaggle: z.string(),
  behance: z.string(),
  dribbble: z.string(),
  stackoverflow: z.string(),
});

export const ResumeSchema = z.object({
  personalInfo: PersonalInfoSchema,

  summary: z.string(),

  profession: ProfessionSchema,

  skills: SkillsSchema,

  experience: z.array(ExperienceSchema),

  education: z.array(EducationSchema),

  projects: z.array(ProjectSchema),

  certifications: z.array(CertificationSchema),

  achievements: z.array(AchievementSchema),

  languages: z.array(z.string()),

  socialLinks: SocialLinksSchema,

});
