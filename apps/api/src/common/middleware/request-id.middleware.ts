import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const REQUEST_ID_HEADER = 'x-correlation-id';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const correlationId = (req.headers[REQUEST_ID_HEADER] as string) || uuidv4();
    req.headers[REQUEST_ID_HEADER] = correlationId;
    res.setHeader(REQUEST_ID_HEADER, correlationId);
    next();
  }
}

