import React from 'react';
import { Wordmark, Button, ScentFamilyChip, Card } from '@lamaia/ui';
import { ScentFamily } from '@lamaia/ui';

const scentFamilies: { family: ScentFamily; label: string; desc: string }[] = [
  { family: 'floral', label: 'Floral', desc: 'Jasmine Sambac, Damask Rose, Iris' },
  { family: 'woody', label: 'Woody', desc: 'Mysore Sandalwood, Cedar, Vetiver' },
  { family: 'amber', label: 'Amber', desc: 'Golden Resins, Labdanum, Spiced Tonka' },
  { family: 'fresh', label: 'Fresh', desc: 'Dewy Green Tea, Ozone, Petrichor' },
  { family: 'citrus', label: 'Citrus', desc: 'Bergamot, Bitter Orange, Neroli' },
  { family: 'gourmand', label: 'Gourmand', desc: 'Cardamom Pods, Dark Cocoa, Saffron' },
  { family: 'earthy', label: 'Earthy', desc: 'Terracotta, Moist Forest Soil, Moss' },
];

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Editorial Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-36 px-4 sm:px-6 lg:px-8 border-b border-line/40">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold">
              Fragrance Atelier &bull; India
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-light text-ink tracking-tight leading-[1.1]">
            the invisible made felt.
          </h1>

          <p className="text-base sm:text-lg text-ink-secondary font-sans max-w-2xl mx-auto leading-relaxed font-light">
            An unhurried journey through raw botanicals, warm terracotta, and slow aged extraits.
            Artisanal fine fragrances designed and distilled for the Indian climate.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/discovery-sets">
              <Button size="lg" variant="primary">
                Explore Discovery Sets
              </Button>
            </a>
            <a href="/finder">
              <Button size="lg" variant="secondary">
                Find Your Scent
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Scent Family Navigation Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl font-display text-ink">
            Seven Olfactive Families
          </h2>
          <p className="text-sm font-sans text-ink-secondary">
            Every creation is rooted in an olfactive tradition, from night-blooming florals to ancient woods.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {scentFamilies.map((item) => (
            <a key={item.family} href={`/families/${item.family}`}>
              <ScentFamilyChip family={item.family} label={item.label} />
            </a>
          ))}
        </div>
      </section>

      {/* Discovery Sets & Full-Size Credit Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-raised rounded border border-line p-8 sm:p-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-accent font-sans font-semibold">
              The Discovery Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-display text-ink leading-tight">
              Wear the fragrance before choosing your bottle.
            </h2>
            <p className="text-sm sm:text-base font-sans text-ink-secondary leading-relaxed font-light">
              Fragrance breathes differently on every skin. Our Discovery Set features five curated 2ml
              vials. The entire purchase price is credited toward your subsequent full-size 50ml or
              100ml bottle.
            </p>
            <div className="pt-2">
              <a href="/discovery-sets">
                <Button variant="dark">Explore Discovery Sets & Credit</Button>
              </a>
            </div>
          </div>

          <div className="bg-surface border border-line/60 rounded p-8 text-center space-y-4">
            <Wordmark size="md" />
            <div className="text-5xl font-display text-accent pt-2">5 x 2ml</div>
            <p className="text-xs uppercase tracking-widest text-ink-secondary font-sans">
              Curated Artisanal Discovery Set
            </p>
            <div className="text-sm font-sans font-medium text-ink pt-2">
              Includes 100% Full-Size Bottle Voucher
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Dangerous Goods Assurance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-surface border-line/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-2">
              <h3 className="text-base font-display text-ink">Surface Express Transit</h3>
              <p className="text-xs font-sans text-ink-secondary leading-relaxed">
                Alcohol-based perfumes require careful surface handling under dangerous goods transit rules.
                We ensure secure, temperature-monitored ground delivery.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-display text-ink">Legal Metrology &amp; IFRA</h3>
              <p className="text-xs font-sans text-ink-secondary leading-relaxed">
                Full transparency. Every batch carries net quantity, HSN details, manufacturing date, and
                IFRA-compliant allergen disclosures.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-display text-ink">Fresh Batch Assurance</h3>
              <p className="text-xs font-sans text-ink-secondary leading-relaxed">
                All bottles are tracked at batch level with strict First-Expiry-First-Out (FEFO) warehouse
                allocation. No expired stock, ever.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

