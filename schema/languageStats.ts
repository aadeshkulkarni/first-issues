import { z } from "zod";

export const langStatsSchema = z.object({
    language: z.string(),
    count: z.number()
});

export type LangStats = z.infer<typeof langStatsSchema>;
