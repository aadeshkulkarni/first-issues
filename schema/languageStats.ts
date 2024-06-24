import { z } from "zod";

export const langStatsSchema = z.record(z.string(), z.number());

export type LangStats = z.infer<typeof langStatsSchema>;
