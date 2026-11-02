import { z } from 'zod';

export const ComplianceDeclarationSchema = z.object({
  id: z.string().uuid().optional(),
  skuId: z.string().uuid(),
  mrpInPaise: z.number().int().positive(),
  netVolumeMl: z.number().positive(),
  manufacturerName: z.string().min(2),
  manufacturerAddress: z.string().min(5),
  packerName: z.string().min(2),
  packerAddress: z.string().min(5),
  monthYearOfManufacture: z.string().regex(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Must be in MM/YYYY format'),
  shelfLifeMonths: z.number().int().positive(),
  countryOfOrigin: z.string().default('India'),
  consumerCareEmail: z.string().email(),
  consumerCarePhone: z.string().min(10),
  cosmeticsLicenceNumber: z.string().min(3),
  hsnCode: z.string().regex(/^\d{4,8}$/, 'HSN code must be 4 to 8 digits (e.g. 33030010/33030020)'),
  ingredientList: z.array(z.string()).min(1),
  allergens: z.array(z.string()).default([]),
  warnings: z.array(z.string()).min(1),
  version: z.number().int().default(1),
  isApprovedByLegal: z.boolean().default(false),
});

export type ComplianceDeclaration = z.infer<typeof ComplianceDeclarationSchema>;

