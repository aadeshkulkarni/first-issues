import { z } from "zod";

const repoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  language: z.string(),
  stargazers_count: z.number(),
  updated_at: z.string()
});

export type Repo = z.infer<typeof repoSchema>;
