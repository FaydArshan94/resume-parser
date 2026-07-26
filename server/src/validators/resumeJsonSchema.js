import { z } from "zod";
import { ResumeSchema } from "./resume.schema.js";

const schema = z.toJSONSchema(ResumeSchema);

console.dir(zodToJsonSchema(ResumeSchema), {
  depth: null,
});