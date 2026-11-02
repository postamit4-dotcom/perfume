import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiEnvSchema, validateEnv } from '@lamaia/config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Validate environment variables strictly
  const env = validateEnv(ApiEnvSchema);

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  // Enable CORS
  const origins = env.CORS_ORIGIN.split(',').map((o) => o.trim());
  app.enableCors({
    origin: origins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-correlation-id'],
  });

  // Global prefix
  app.setGlobalPrefix(env.API_PREFIX);

  // Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger OpenAPI Setup
  const config = new DocumentBuilder()
    .setTitle('la maia Commerce API')
    .setDescription('Production-grade single-brand fragrance commerce REST API for La Maia')
    .setVersion('0.1.0')
    .addTag('Health', 'Liveness and Readiness checks')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(env.PORT, env.HOST);
  logger.log(`🌸 La Maia API running on http://${env.HOST}:${env.PORT}/${env.API_PREFIX}`);
  logger.log(`📖 OpenAPI documentation available on http://${env.HOST}:${env.PORT}/docs`);
}

bootstrap().catch((err) => {
  console.error('Fatal API bootstrap error:', err);
  process.exit(1);
});

