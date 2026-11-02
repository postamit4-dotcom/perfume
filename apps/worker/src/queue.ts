import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';

export interface BaseJobData {
  id: string;
  type: string;
  createdAt: string;
}

export function createRedisConnection(redisUrl: string): IORedis {
  return new IORedis(redisUrl, {
    maxRetriesPerRequest: null,
    lazyConnect: true,
  });
}

export class OrderQueueManager {
  private queue: Queue | null = null;
  private worker: Worker | null = null;

  constructor(private redisUrl: string) {}

  async initialize() {
    const connection = createRedisConnection(this.redisUrl);
    
    this.queue = new Queue('order-tasks', {
      connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        removeOnComplete: 100,
        removeOnFail: 500,
      },
    });

    this.worker = new Worker(
      'order-tasks',
      async (job: Job<BaseJobData>) => {
        console.log(`Processing job ${job.id} of type ${job.data.type}`);
        // Worker task handling logic will be expanded in Phase 03/07/08
        return { success: true, processedAt: new Date().toISOString() };
      },
      { connection }
    );

    this.worker.on('failed', (job, err) => {
      console.error(`Worker job ${job?.id} failed:`, err);
    });

    console.log('✅ BullMQ OrderQueueManager initialized');
  }

  async close() {
    await this.worker?.close();
    await this.queue?.close();
    console.log('Worker queue connections gracefully closed');
  }
}

