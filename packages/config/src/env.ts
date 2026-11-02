import { z } from 'zod';

export const ApiEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  HOST: z.string().default('0.0.0.0'),
  API_PREFIX: z.string().default('v1'),
  CORS_ORIGIN: z.string().default('http://localhost:3000,http://localhost:3001'),
  DATABASE_URL: z.string().url().default('postgresql://postgres:postgres@localhost:5432/lamaia_dev?schema=public'),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  JWT_SECRET: z.string().min(32).default('lamaia_super_secret_signing_key_32_characters_minimum!'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export const WorkerEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().default(4001),
  DATABASE_URL: z.string().url().default('postgresql://postgres:postgres@localhost:5432/lamaia_dev?schema=public'),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export const StorefrontEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:4000/v1'),
  NEXT_PUBLIC_APP_NAME: z.string().default('la maia'),
});

export const AdminEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3001),
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:4000/v1'),
  NEXT_PUBLIC_APP_NAME: z.string().default('la maia admin'),
});

export type ApiEnv = z.infer<typeof ApiEnvSchema>;
export type WorkerEnv = z.infer<typeof WorkerEnvSchema>;
export type StorefrontEnv = z.infer<typeof StorefrontEnvSchema>;
export type AdminEnv = z.infer<typeof AdminEnvSchema>;

export function validateEnv<T extends z.ZodTypeAny>(schema: T, source: Record<string, unknown> = process.env): z.infer<T> {
  const result = schema.safeParse(source);
  if (!result.success) {
    console.error('❌ Invalid environment variables:', JSON.stringify(result.error.format(), null, 2));
    throw new Error('Environment variable validation failed');
  }
  return result.data;
}

