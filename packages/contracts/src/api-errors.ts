import { z } from 'zod';

export enum ApiErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  RATE_LIMITED = 'RATE_LIMITED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  INSUFFICIENT_STOCK = 'INSUFFICIENT_STOCK',
  MRP_EXCEEDED = 'MRP_EXCEEDED',
  COMPLIANCE_DECLARATION_MISSING = 'COMPLIANCE_DECLARATION_MISSING',
  INVALID_SHIPPING_CLASS = 'INVALID_SHIPPING_CLASS',
  CREDIT_ALREADY_REDEEMED = 'CREDIT_ALREADY_REDEEMED',
  PAYMENT_VERIFICATION_FAILED = 'PAYMENT_VERIFICATION_FAILED',
}

export const ApiErrorResponseSchema = z.object({
  statusCode: z.number(),
  code: z.nativeEnum(ApiErrorCode),
  message: z.string(),
  details: z.unknown().optional(),
  timestamp: z.string(),
  path: z.string(),
  correlationId: z.string().optional(),
});

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

