/**
 * LA MAIA Currency Utilities
 * Core Invariant: Money is ALWAYS stored and calculated in integer minor units (INR paise).
 * 1 INR = 100 paise.
 */

export interface PriceValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates that selling price does not exceed Maximum Retail Price (MRP).
 */
export function validateSellingPrice(priceInPaise: number, mrpInPaise: number): PriceValidationResult {
  if (!Number.isInteger(priceInPaise) || priceInPaise < 0) {
    return { valid: false, error: 'Price must be a non-negative integer (paise)' };
  }
  if (!Number.isInteger(mrpInPaise) || mrpInPaise <= 0) {
    return { valid: false, error: 'MRP must be a positive integer (paise)' };
  }
  if (priceInPaise > mrpInPaise) {
    return { valid: false, error: `Selling price (${priceInPaise} paise) cannot exceed MRP (${mrpInPaise} paise)` };
  }
  return { valid: true };
}

/**
 * Formats paise to Indian Rupee representation (e.g., 250000 paise -> ₹2,500).
 */
export function formatINR(paise: number, options: { includePaise?: boolean } = {}): string {
  if (!Number.isFinite(paise)) return '₹0';
  const rupees = paise / 100;
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: options.includePaise ? 2 : (paise % 100 === 0 ? 0 : 2),
    maximumFractionDigits: 2,
  }).format(rupees);
}

/**
 * Converts rupees float (from user inputs) safely to integer paise.
 */
export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

/**
 * Converts integer paise to decimal rupees.
 */
export function paiseToRupees(paise: number): number {
  return paise / 100;
}

/**
 * Calculates price per ml in rupees with one decimal place.
 */
export function calculatePricePerMl(priceInPaise: number, volumeInMl: number): string {
  if (volumeInMl <= 0 || priceInPaise < 0) return '₹0/ml';
  const priceInRupees = priceInPaise / 100;
  const rate = priceInRupees / volumeInMl;
  return `₹${rate.toFixed(1)}/ml`;
}

