import { describe, it, expect } from 'vitest';
import { WorkerEnvSchema } from '@lamaia/config';

describe('Worker Environment & Schema', () => {
  it('validates worker environment defaults', () => {
    const env = WorkerEnvSchema.parse({
      DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/lamaia_dev',
      REDIS_URL: 'redis://localhost:6379',
    });
    expect(env.PORT).toBe(4001);
    expect(env.NODE_ENV).toBe('development');
  });
});

