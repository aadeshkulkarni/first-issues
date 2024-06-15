import { z } from "zod";

const repoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export type Repo = z.infer<typeof repoSchema>;
