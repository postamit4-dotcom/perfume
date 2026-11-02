import { describe, it, expect } from 'vitest';
import { HealthService } from '../src/health/health.service';

describe('HealthService', () => {
  const service = new HealthService();

  it('returns valid liveness response', async () => {
    const liveness = await service.getLiveness();
    expect(liveness.status).toBe('ok');
    expect(liveness.service).toBe('@lamaia/api');
    expect(typeof liveness.uptime).toBe('number');
  });

  it('returns readiness status structure', async () => {
    const readiness = await service.getReadiness();
    expect(['ok', 'degraded', 'error']).toContain(readiness.status);
    expect(readiness.dependencies).toBeDefined();
  });
});

