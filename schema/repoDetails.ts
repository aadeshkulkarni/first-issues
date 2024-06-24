import { z } from "zod";
import { repoSchema } from "./repo";

export const repoDetailsSchema = z.object({
  last_modified: z.string().datetime(),
  details: repoSchema.array()
});

export type RepoDetails = z.infer<typeof repoDetailsSchema>;