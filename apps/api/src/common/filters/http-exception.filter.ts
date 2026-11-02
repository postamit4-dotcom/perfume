import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorCode, ApiErrorResponse } from '@lamaia/contracts';
import { REQUEST_ID_HEADER } from '../middleware/request-id.middleware';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const correlationId = (request.headers[REQUEST_ID_HEADER] as string) || 'unknown';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = ApiErrorCode.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';
    let details: unknown = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const obj = res as Record<string, unknown>;
        message = (obj.message as string) || exception.message;
        details = obj.details || obj;
      }

      switch (status) {
        case HttpStatus.BAD_REQUEST:
          code = ApiErrorCode.BAD_REQUEST;
          break;
        case HttpStatus.UNAUTHORIZED:
          code = ApiErrorCode.UNAUTHORIZED;
          break;
        case HttpStatus.FORBIDDEN:
          code = ApiErrorCode.FORBIDDEN;
          break;
        case HttpStatus.NOT_FOUND:
          code = ApiErrorCode.NOT_FOUND;
          break;
        case HttpStatus.CONFLICT:
          code = ApiErrorCode.CONFLICT;
          break;
        case HttpStatus.UNPROCESSABLE_ENTITY:
          code = ApiErrorCode.UNPROCESSABLE_ENTITY;
          break;
        case HttpStatus.TOO_MANY_REQUESTS:
          code = ApiErrorCode.RATE_LIMITED;
          break;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const errorPayload: ApiErrorResponse = {
      statusCode: status,
      code,
      message: Array.isArray(message) ? message.join(', ') : message,
      details,
      timestamp: new Date().toISOString(),
      path: request.url,
      correlationId,
    };

    if (status >= 500) {
      this.logger.error(
        `[${correlationId}] ${request.method} ${request.url} ${status} - ${errorPayload.message}`,
        exception instanceof Error ? exception.stack : undefined
      );
    } else {
      this.logger.warn(
        `[${correlationId}] ${request.method} ${request.url} ${status} - ${errorPayload.message}`
      );
    }

    response.status(status).json(errorPayload);
  }
}

