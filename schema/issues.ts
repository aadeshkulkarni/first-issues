import { z } from "zod";

export const issueSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  number: z.number(),
  comments_count: z.number(),
  created_at: z.string().datetime(),
});

export type Issue = z.infer<typeof issueSchema>;
