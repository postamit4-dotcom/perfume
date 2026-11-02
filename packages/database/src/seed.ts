import { PrismaClient, Concentration, ShippingClass, BatchStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting La Maia database seed...');

  // 1. Roles
  const roles = [
    { name: 'OWNER', description: 'Full business and system administration' },
    { name: 'CATALOG_MANAGER', description: 'Manages fragrances, notes, collections and media' },
    { name: 'WAREHOUSE', description: 'Manages batch intake, stock adjustments, pick & pack' },
    { name: 'CUSTOMER_SUPPORT', description: 'Handles order claims, tickets and inquiries' },
    { name: 'MARKETING', description: 'Manages coupons, campaigns and editorial journal' },
    { name: 'FINANCE', description: 'Audit reports, payment reconciliations, GST summaries' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }
  console.log('✅ Seeded roles');

  // 2. Scent Families with brand design tokens
  const scentFamilies = [
    { name: 'Floral', slug: 'floral', colorToken: '#C98B8B', description: 'Heady night-blooming jasmine, damp rose petals, powdery iris.' },
    { name: 'Woody', slug: 'woody', colorToken: '#8A6A4F', description: 'Aged Mysore sandalwood, cedarwood shavings, smoky vetiver.' },
    { name: 'Amber', slug: 'amber', colorToken: '#B5763A', description: 'Golden resins, warm labdanum, balsamic tonka, spiced vanilla.' },
    { name: 'Fresh', slug: 'fresh', colorToken: '#6F9A94', description: 'Ozone, crisp green tea leaves, dewy stems, marine mist.' },
    { name: 'Citrus', slug: 'citrus', colorToken: '#C9A43B', description: 'Sun-warmed bergamot, bitter orange peel, sparkling neroli.' },
    { name: 'Gourmand', slug: 'gourmand', colorToken: '#8E5B4A', description: 'Roasted cardamom pods, dark cocoa, warm saffron milk.' },
    { name: 'Earthy', slug: 'earthy', colorToken: '#7A6B55', description: 'First monsoon rain on sun-baked terracotta, dry moss, moist soil.' },
  ];

  for (const family of scentFamilies) {
    await prisma.fragranceFamily.upsert({
      where: { slug: family.slug },
      update: family,
      create: family,
    });
  }
  console.log('✅ Seeded scent families');

  // 3. Central Warehouse
  const warehouse = await prisma.warehouse.upsert({
    where: { code: 'WH-BLR-01' },
    update: {},
    create: {
      name: 'La Maia Central Warehouse — Bengaluru',
      code: 'WH-BLR-01',
      pincode: '560001',
      city: 'Bengaluru',
      state: 'Karnataka',
    },
  });
  console.log('✅ Seeded central warehouse:', warehouse.code);

  console.log('🎉 Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

