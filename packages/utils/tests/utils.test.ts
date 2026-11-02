import { describe, it, expect } from 'vitest';
import { formatINR, validateSellingPrice, calculatePricePerMl, rupeesToPaise } from '../src/currency';
import { slugify } from '../src/slug';
import { sanitizeGiftMessage } from '../src/sanitize';

describe('Currency Utilities', () => {
  it('formats paise into INR currency format correctly', () => {
    expect(formatINR(250000)).toBe('₹2,500');
    expect(formatINR(49900)).toBe('₹499');
    expect(formatINR(49950)).toBe('₹499.50');
  });

  it('enforces that selling price cannot exceed MRP', () => {
    const valid = validateSellingPrice(250000, 300000);
    expect(valid.valid).toBe(true);

    const equal = validateSellingPrice(300000, 300000);
    expect(equal.valid).toBe(true);

    const invalid = validateSellingPrice(350000, 300000);
    expect(invalid.valid).toBe(false);
    expect(invalid.error).toContain('cannot exceed MRP');
  });

  it('calculates price per ml accurately', () => {
    // ₹2,500 for 50ml -> ₹50.0/ml
    expect(calculatePricePerMl(250000, 50)).toBe('₹50.0/ml');
    // ₹4,500 for 100ml -> ₹45.0/ml
    expect(calculatePricePerMl(450000, 100)).toBe('₹45.0/ml');
  });

  it('converts rupees to paise safely', () => {
    expect(rupeesToPaise(1299.50)).toBe(129950);
  });
});

describe('Slug Utilities', () => {
  it('generates clean URL slugs for perfume domain entities', () => {
    expect(slugify('Rain on Terracotta')).toBe('rain-on-terracotta');
    expect(slugify('Jasmine & Sandalwood')).toBe('jasmine-and-sandalwood');
    expect(slugify('Extrait de Parfum 100ml')).toBe('extrait-de-parfum-100ml');
  });
});

describe('Sanitize Utilities', () => {
  it('strips malicious HTML and javascript from gift messages', () => {
    const malicious = '<script>alert("hack")</script>Happy Birthday!';
    const result = sanitizeGiftMessage(malicious);
    expect(result.isValid).toBe(true);
    expect(result.clean).toBe('alert("hack")Happy Birthday!');
    expect(result.clean).not.toContain('<script>');
  });

  it('rejects overly long gift messages', () => {
    const longMessage = 'A'.repeat(305);
    const result = sanitizeGiftMessage(longMessage);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('exceeds maximum length');
  });
});

