import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { HealthCheckResponse } from '@lamaia/contracts';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'System health check' })
  @ApiResponse({ status: 200, description: 'Overall system health' })
  async getHealth(): Promise<HealthCheckResponse> {
    return this.healthService.getReadiness();
  }

  @Get('live')
  @ApiOperation({ summary: 'Kubernetes/Railway Liveness Probe' })
  @ApiResponse({ status: 200, description: 'API process is alive' })
  async getLive(): Promise<HealthCheckResponse> {
    return this.healthService.getLiveness();
  }

  @Get('ready')
  @ApiOperation({ summary: 'Kubernetes/Railway Readiness Probe' })
  @ApiResponse({ status: 200, description: 'API is ready to handle traffic' })
  async getReady(): Promise<HealthCheckResponse> {
    return this.healthService.getReadiness();
  }
}

