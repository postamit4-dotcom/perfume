/**
 * Testing utilities and mock helpers for La Maia
 */

export function createMockId(prefix = 'mock'): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}`;
}

export function createMockFragrance(overrides: Record<string, unknown> = {}) {
  return {
    id: createMockId('frag'),
    name: 'Rain on Terracotta',
    slug: 'rain-on-terracotta',
    story: 'First rain falling upon sun-baked clay; petrichor, damp earth and fresh air.',
    isPublished: true,
    ...overrides,
  };
}

export function createMockVariant(overrides: Record<string, unknown> = {}) {
  return {
    id: createMockId('var'),
    sku: 'LM-ROT-EDP-50',
    title: '50 ml / 1.7 fl. oz.',
    volumeMl: 50,
    concentration: 'EAU_DE_PARFUM',
    mrpPaise: 300000,
    pricePaise: 250000,
    weightGrams: 280,
    shippingClass: 'FLAMMABLE_SURFACE_ONLY',
    isPublished: true,
    ...overrides,
  };
}

