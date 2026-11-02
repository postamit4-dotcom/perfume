import { z } from 'zod';

export const HealthCheckResponseSchema = z.object({
  status: z.enum(['ok', 'degraded', 'error']),
  service: z.string(),
  version: z.string(),
  timestamp: z.string(),
  uptime: z.number(),
  dependencies: z.record(
    z.string(),
    z.object({
      status: z.enum(['up', 'down', 'disabled']),
      latencyMs: z.number().optional(),
      message: z.string().optional(),
    })
  ).optional(),
});

export type HealthCheckResponse = z.infer<typeof HealthCheckResponseSchema>;

