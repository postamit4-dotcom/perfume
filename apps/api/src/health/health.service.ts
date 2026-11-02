import { Injectable } from '@nestjs/common';
import { HealthCheckResponse } from '@lamaia/contracts';
import { prisma } from '@lamaia/database';

@Injectable()
export class HealthService {
  private readonly startTime = Date.now();

  async getLiveness(): Promise<HealthCheckResponse> {
    return {
      status: 'ok',
      service: '@lamaia/api',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
    };
  }

  async getReadiness(): Promise<HealthCheckResponse> {
    const dependencies: HealthCheckResponse['dependencies'] = {};
    let overallStatus: 'ok' | 'degraded' | 'error' = 'ok';

    // Database probe
    const dbStart = Date.now();
    try {
      await prisma.$queryRaw`SELECT 1`;
      dependencies['database'] = {
        status: 'up',
        latencyMs: Date.now() - dbStart,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'DB connection error';
      dependencies['database'] = {
        status: 'down',
        message: msg,
      };
      // For Phase 00 local setup when DB may not be running yet, report degraded
      overallStatus = 'degraded';
    }

    // Redis probe stub
    dependencies['redis'] = {
      status: 'disabled',
      message: 'Worker and cache queue connection pending configuration',
    };

    return {
      status: overallStatus,
      service: '@lamaia/api',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      dependencies,
    };
  }
}

