import { z } from "zod";
import { issueSchema } from "./issues";

export const repoSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  description: z.string(),
  language: z.string(),
  last_modified: z.string().datetime(),
  url: z.string().url(),
  stars: z.number(),
  issues: z.array(issueSchema),
});

export type Repo = z.infer<typeof repoSchema>;
