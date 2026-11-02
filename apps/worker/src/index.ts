import http from 'http';
import { WorkerEnvSchema, validateEnv } from '@lamaia/config';
import { OrderQueueManager } from './queue';

async function bootstrap() {
  const env = validateEnv(WorkerEnvSchema);
  console.log(`🌸 Starting La Maia Worker (Node.js + BullMQ) in ${env.NODE_ENV} mode...`);

  const queueManager = new OrderQueueManager(env.REDIS_URL);
  
  // Try connecting queue manager if Redis is reachable, otherwise log warning
  try {
    await queueManager.initialize();
  } catch (err) {
    console.warn('⚠️ Redis not yet reachable; worker will retry on job schedule:', err);
  }

  // Health check HTTP server for Docker/K8s/Railway
  const startTime = Date.now();
  const server = http.createServer((req, res) => {
    if (req.url === '/health' || req.url === '/health/live' || req.url === '/health/ready') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          status: 'ok',
          service: '@lamaia/worker',
          version: '0.1.0',
          uptime: Math.floor((Date.now() - startTime) / 1000),
          timestamp: new Date().toISOString(),
        })
      );
      return;
    }

    res.writeHead(404);
    res.end();
  });

  server.listen(env.PORT, () => {
    console.log(`🩺 Worker health check listening on port ${env.PORT}`);
  });

  const shutdown = async (signal: string) => {
    console.log(`Received ${signal}, shutting down gracefully...`);
    server.close();
    await queueManager.close();
    process.exit(0);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  console.error('Fatal worker error:', err);
  process.exit(1);
});

