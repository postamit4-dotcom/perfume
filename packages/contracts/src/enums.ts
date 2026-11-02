/**
 * LA MAIA Core Enums
 * Defined according to AGENTS.md and perfume domain invariants
 */

export enum FragranceConcentration {
  EXTRAIT_DE_PARFUM = 'EXTRAIT_DE_PARFUM',
  EAU_DE_PARFUM = 'EAU_DE_PARFUM',
  EAU_DE_TOILETTE = 'EAU_DE_TOILETTE',
  ATTAR = 'ATTAR',
  BODY_MIST = 'BODY_MIST',
}

export enum ScentFamilyType {
  FLORAL = 'FLORAL',
  WOODY = 'WOODY',
  AMBER = 'AMBER',
  FRESH = 'FRESH',
  CITRUS = 'CITRUS',
  GOURMAND = 'GOURMAND',
  EARTHY = 'EARTHY',
}

export enum NoteTier {
  TOP = 'TOP',
  HEART = 'HEART',
  BASE = 'BASE',
}

/**
 * Dangerous goods / courier shipping classification
 * Alcohol-based perfumes MUST be FLAMMABLE_SURFACE_ONLY unless explicit air carriage approval is verified.
 */
export enum ShippingClass {
  FLAMMABLE_SURFACE_ONLY = 'FLAMMABLE_SURFACE_ONLY',
  NON_FLAMMABLE_SURFACE_ONLY = 'NON_FLAMMABLE_SURFACE_ONLY',
  AIR_ALLOWED = 'AIR_ALLOWED',
}

export enum BatchStatus {
  AVAILABLE = 'AVAILABLE',
  QUARANTINED = 'QUARANTINED',
  EXPIRED = 'EXPIRED',
  DAMAGED = 'DAMAGED',
}

export enum OrderStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  COD_CONFIRMED = 'COD_CONFIRMED',
  PROCESSING = 'PROCESSING',
  PACKED = 'PACKED',
  SHIPPED = 'SHIPPED',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
}

export enum PaymentStatus {
  INITIATED = 'INITIATED',
  AUTHORIZED = 'AUTHORIZED',
  CAPTURED = 'CAPTURED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}

export enum PaymentMethod {
  RAZORPAY = 'RAZORPAY',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
}

export enum AdminRole {
  OWNER = 'OWNER',
  CATALOG_MANAGER = 'CATALOG_MANAGER',
  WAREHOUSE = 'WAREHOUSE',
  CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',
  MARKETING = 'MARKETING',
  FINANCE = 'FINANCE',
}

