'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  badge: string;
  family: 'fresh' | 'woody' | 'spicy' | 'oud';
  notes: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  mrp: number;
  price: number;
  saveAmount: number;
  image: string;
}

const products: Product[] = [
  {
    id: 'aventus',
    name: 'Aventus',
    badge: 'BESTSELLER',
    family: 'fresh',
    notes: 'Bergamot, Crisp Apple, Smoky Birch, Patchouli, Ambergris Accord',
    topNotes: 'Calabrian Bergamot, Crisp Apple, Blackcurrant',
    heartNotes: 'Smoky Birch, Patchouli, Moroccan Jasmine',
    baseNotes: 'Ambergris Accord, Oakmoss, Madagascar Vanilla',
    mrp: 700,
    price: 499,
    saveAmount: 201,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'aqua-di-gio',
    name: 'Aqua Di Gio',
    badge: 'FRESH AQUATIC',
    family: 'fresh',
    notes: 'Marine Accord, Calabrian Bergamot, Rosemary, Cedarwood, White Musk',
    topNotes: 'Sea Notes, Bergamot, Green Mandarin',
    heartNotes: 'Rosemary, Lavender, Cypress Accord',
    baseNotes: 'Cedarwood, Patchouli, Mineral Amber, White Musk',
    mrp: 700,
    price: 499,
    saveAmount: 201,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cool-water',
    name: 'Cool Water',
    badge: 'CRISP DAYWEAR',
    family: 'fresh',
    notes: 'Crisp Peppermint, Lavender, Neroli, Cedarwood, Warm Amber',
    topNotes: 'Sea Water, Mint, Green Notes, Lavender, Coriander',
    heartNotes: 'Sandalwood, Jasmine, Neroli, Geranium',
    baseNotes: 'Musk, Oakmoss, Cedar, Tobacco, Amber',
    mrp: 700,
    price: 499,
    saveAmount: 201,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hawas',
    name: 'Hawas',
    badge: 'SPICED AQUATIC',
    family: 'spicy',
    notes: 'Apple, Cinnamon, Orange Blossom, Grey Ambergris, Driftwood',
    topNotes: 'Apple, Bergamot, Lemon, Cinnamon',
    heartNotes: 'Watery Notes, Plum, Orange Blossom, Cardamom',
    baseNotes: 'Ambergris, Musk, Patchouli, Driftwood',
    mrp: 700,
    price: 499,
    saveAmount: 201,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sauvage',
    name: 'Sauvage',
    badge: 'EVENING SPICE',
    family: 'spicy',
    notes: 'Reggio Bergamot, Sichuan Pepper, Star Anise, Ambroxan, Virginian Cedar',
    topNotes: 'Calabrian Bergamot, Pepper',
    heartNotes: 'Sichuan Pepper, Lavender, Pink Pepper, Vetiver, Patchouli',
    baseNotes: 'Ambroxan, Cedar, Labdanum',
    mrp: 700,
    price: 499,
    saveAmount: 201,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'blue-de-chanel',
    name: 'Blue De Chanel',
    badge: 'BOARDROOM WOODY',
    family: 'woody',
    notes: 'Grapefruit, Mint, Ginger, Frankincense, Haitian Vetiver, Sandalwood',
    topNotes: 'Grapefruit, Lemon, Mint, Pink Pepper',
    heartNotes: 'Ginger, Nutmeg, Jasmine, Iso E Super',
    baseNotes: 'Incense, Vetiver, Cedar, Sandalwood, Patchouli, Labdanum',
    mrp: 700,
    price: 499,
    saveAmount: 201,
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80',
  },
];

const faqs = [
  {
    q: 'Why are orders shipped via surface courier instead of air cargo?',
    a: 'Ethanol-based fine perfumes are classified as flammable liquids under international civil aviation (IATA) safety regulations and are legally prohibited from commercial passenger air transit. To ensure 100% legal compliance and safe transit, all parcels travel via dedicated ground surface logistics through Shiprocket courier partners (Shadowfax, Delhivery, Ekart, XpressBees).',
  },
  {
    q: 'What is the perfume for men price structure and estimated delivery timeline across India?',
    a: 'Our collection pricing starts at ₹499 (MRP ₹700) for standard 50ml Eau de Parfum bottles. Surface transit across serviceable Indian pin codes takes between 3 to 9 business days (Metro cities arrive within 3 to 5 business days with SMS/email AWB tracking).',
  },
  {
    q: 'How does an Eau de Parfum compare to a body perfume for men or gas deodorant?',
    a: 'Unlike a conventional aerosol body spray or alcohol-diluted deodorant that dissipates within an hour, our Eau de Parfum (EDP) formulations carry concentrated fine perfume oils designed for enduring skin intimacy and projection in Indian humidity. Each 50ml bottle delivers 500+ concentrated fine mist sprays without compressed propellants.',
  },
  {
    q: 'Why do we operate strictly on prepaid orders (no COD)?',
    a: 'To maintain our direct-to-consumer price point of ₹499 (MRP ₹700) and absorb high courier return fees caused by arbitrary COD rejections, we require 100% prepaid orders. All payments are processed through Cashfree Payments, an RBI-authorised payment aggregator supporting UPI (Google Pay, PhonePe, Paytm), RuPay, Visa, Mastercard, and Net Banking.',
  },
  {
    q: 'What is the exact return policy and timeline?',
    a: 'You have 7 days from the delivery date to initiate a return. For hygiene and safety standards, returned items must be unopened, in their original packaging, with all seals and cellophane intact. If an item arrives broken, defective, or incorrect, we pay the return shipping fee and issue a full refund to your original payment method.',
  },
  {
    q: 'What bottle size and fragrance concentration do you offer?',
    a: 'Our standard releases are bottled in 50 ml Eau de Parfum (EDP) format. Eau de Parfum features a higher concentration of fine perfume oils compared to Eau de Toilette or body deodorants, engineered to linger gracefully throughout the day.',
  },
];

export default function MensPerfumePage() {
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [activeTier, setActiveTier] = useState<'top' | 'heart' | 'base'>('base');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [addedProduct, setAddedProduct] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [scentPreference, setScentPreference] = useState('fresh');
  const [dpdpConsent, setDpdpConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredProducts =
    selectedFamily === 'all'
      ? products
      : products.filter((p) => p.family === selectedFamily);

  const handleAddToCart = (name: string) => {
    setAddedProduct(name);
    setTimeout(() => setAddedProduct(null), 3000);
  };

  const handleSubmitLeadForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setFormError('Please provide either an email address or mobile number.');
      return;
    }
    if (phone.trim() && !/^[6-9]\d{9}$/.test(phone.trim().replace(/\D/g, ''))) {
      setFormError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!dpdpConsent) {
      setFormError('Mandatory consent under the DPDP Act 2023 is required to receive recommendations.');
      return;
    }

    setFormError(null);
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#211D1A] min-h-screen font-sans selection:bg-[#9C7440] selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Product',
                name: "Men's Eau de Parfum Collection (50ml)",
                description:
                  'Master-blended 50ml Eau de Parfum fragrances for men formulated with high oil concentrations for all-day presence in Indian climates.',
                brand: {
                  '@type': 'Brand',
                  name: 'la maia',
                },
                offers: {
                  '@type': 'AggregateOffer',
                  priceCurrency: 'INR',
                  lowPrice: '499',
                  highPrice: '499',
                  offerCount: '6',
                  availability: 'https://schema.org/InStock',
                },
              },
              {
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: f.a,
                  },
                })),
              },
            ],
          }),
        }}
      />

      {/* Trust Announcement Strip */}
      <aside className="bg-[#211D1A] text-[#FAF8F5] py-2 px-4 text-xs font-mono tracking-wider border-b border-[#3E3731]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>PAN-INDIA SURFACE COURIER (3–9 DAYS)</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[#FAF8F5]/80">
            <span>●</span>
            <span>100% PREPAID (CASHFREE RBI-AUTHORISED)</span>
            <span>●</span>
            <span>7-DAY UNOPENED RETURNS</span>
          </div>
          <div className="text-right">
            <a href="tel:+919711562006" className="text-[#C59A58] hover:underline font-semibold">
              SUPPORT: +91-9711562006
            </a>
          </div>
        </div>
      </aside>

      {/* Added to Bag Toast Notification */}
      {addedProduct && (
        <div className="fixed top-24 right-4 z-50 bg-[#211D1A] text-white px-5 py-3 rounded-lg shadow-2xl border border-[#9C7440] flex items-center gap-3 animate-slide-in">
          <span className="text-emerald-400 font-bold">✓</span>
          <span className="text-xs font-medium">
            <strong>{addedProduct}</strong> (50ml EDP) added to bag!
          </span>
        </div>
      )}

      {/* =========================================================
          SECTION 01: HERO SECTION
         ========================================================= */}
      <section className="relative overflow-hidden py-12 md:py-20 border-b border-[#E6DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className="bg-[#9C7440]/15 text-[#9C7440] px-2.5 py-1 rounded font-semibold tracking-wider uppercase">
                  MEN&apos;S HAUTE PARFUMERIE // 50 ML EDP
                </span>
                <span className="bg-[#211D1A] text-[#FAF8F5] px-2.5 py-1 rounded">
                  EAU DE PARFUM
                </span>
                <span className="border border-[#211D1A]/20 px-2.5 py-1 rounded text-[#5A524A]">
                  SURFACE DISPATCH
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#211D1A] font-light tracking-tight leading-[1.1]">
                Perfume for Men,{' '}
                <em className="italic font-serif text-[#9C7440]">From ₹499</em>
              </h1>

              <p className="font-sans text-base sm:text-lg text-[#5A524A] max-w-xl leading-relaxed">
                Master-blended Eau de Parfum formulated with high oil concentrations for all-day presence in Indian weather, direct from our Ghaziabad facility.
              </p>

              {/* Price Strip */}
              <div className="inline-flex items-center gap-3 p-3 bg-white border border-[#E6DEC8] rounded-md shadow-sm">
                <span className="text-xs font-mono text-[#5A524A]">ENTRY PRICE:</span>
                <span className="font-display text-2xl text-[#211D1A] font-bold">₹499</span>
                <span className="text-sm line-through text-[#8C827A] font-mono">MRP ₹700</span>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-mono px-2 py-0.5 rounded font-medium">
                  HONEST DIRECT PRICING
                </span>
              </div>

              {/* CTA Group */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#mens-collection"
                  className="px-6 py-3.5 bg-[#9C7440] text-white hover:bg-[#835F30] transition-colors rounded text-xs font-mono uppercase tracking-wider font-semibold shadow-md"
                >
                  EXPLORE MEN&apos;S SCENTS — FROM ₹499
                </a>
                <a
                  href="#lead-form"
                  className="px-6 py-3.5 border border-[#211D1A] text-[#211D1A] hover:bg-[#211D1A] hover:text-white transition-colors rounded text-xs font-mono uppercase tracking-wider font-semibold"
                >
                  GET SCENT RECOMMENDATION ↓
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-[#E6DEC8]/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-[#5A524A]">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700">✓</span>
                  <span>Surface Courier (3–9 Days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700">✓</span>
                  <span>100% Prepaid (Cashfree)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700">✓</span>
                  <span>7-Day Return Policy</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#E6DEC8] p-6 rounded-lg shadow-xl relative overflow-hidden group">
                <div className="absolute top-4 right-4 bg-[#211D1A] text-[#C59A58] text-[10px] font-mono px-2.5 py-1 rounded tracking-widest uppercase">
                  SIGNATURE EDP // 50 ML
                </div>
                <div className="aspect-[4/5] overflow-hidden rounded mb-4 bg-[#F2EDE4] flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
                    alt="Aventus 50ml Eau de Parfum for men"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="font-display text-xl text-[#211D1A] font-semibold">
                    Fresh Citrus &amp; Smoky Woods
                  </h3>
                  <p className="text-[11px] font-mono text-[#8C827A] uppercase tracking-wider">
                    TOP NOTES: BERGAMOT · BIRCH · AMBERGRIS ACCORD
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 02: USP STRIP
         ========================================================= */}
      <section className="bg-white border-b border-[#E6DEC8] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-mono text-[#9C7440] uppercase tracking-wider mb-6 text-center">
            Every gents perfume in our catalog is master-blended with high oil concentration for enduring projection in Indian temperatures.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-[#FAF8F5] border border-[#E6DEC8]/80 rounded space-y-2">
              <div className="text-xs font-mono text-[#9C7440] font-semibold">01 // LOGISTICS</div>
              <h4 className="font-display text-base font-semibold text-[#211D1A]">Surface Courier Only</h4>
              <p className="text-xs text-[#5A524A] leading-relaxed">
                Compliant with IATA air safety regulations for alcohol-based fragrances. Dispatched strictly via ground transport through Shiprocket.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#E6DEC8]/80 rounded space-y-2">
              <div className="text-xs font-mono text-[#9C7440] font-semibold">02 // TIMELINE</div>
              <h4 className="font-display text-base font-semibold text-[#211D1A]">3–9 Business Days</h4>
              <p className="text-xs text-[#5A524A] leading-relaxed">
                Pan-India delivery across all serviceable pin codes. Metro cities arrive within 3–5 business days with SMS/email AWB tracking.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#E6DEC8]/80 rounded space-y-2">
              <div className="text-xs font-mono text-[#9C7440] font-semibold">03 // CHECKOUT</div>
              <h4 className="font-display text-base font-semibold text-[#211D1A]">100% Prepaid Security</h4>
              <p className="text-xs text-[#5A524A] leading-relaxed">
                Prepaid orders only (Cash on Delivery not offered). Transactions secured by Cashfree Payments (RBI-authorised) via UPI, cards, and net banking.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#E6DEC8]/80 rounded space-y-2">
              <div className="text-xs font-mono text-[#9C7440] font-semibold">04 // GUARANTEE</div>
              <h4 className="font-display text-base font-semibold text-[#211D1A]">7-Day Unopened Returns</h4>
              <p className="text-xs text-[#5A524A] leading-relaxed">
                7-day return window from delivery date for unopened perfumes in original packaging. Damaged items returnable with return shipping paid by us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 03: MEN'S COLLECTION & PRODUCT GRID
         ========================================================= */}
      <section id="mens-collection" className="py-16 md:py-24 border-b border-[#E6DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E6DEC8] pb-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-[#9C7440] uppercase tracking-widest font-semibold block">
                CURATED CATALOGUE // 50 ML EAU DE PARFUM
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#211D1A] font-light">
                Perfume for Men: <em className="italic font-serif text-[#9C7440]">Prices at a Glance.</em>
              </h2>
              <p className="text-xs sm:text-sm text-[#5A524A] max-w-xl">
                Compare our verified men&apos;s Eau de Parfum profiles. Every bottle is hand-poured in a 50ml flacon and dispatches direct from our Ghaziabad facility.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                { id: 'all', label: 'ALL (6)' },
                { id: 'fresh', label: 'FRESH' },
                { id: 'spicy', label: 'SPICY' },
                { id: 'woody', label: 'WOODY' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFamily(tab.id)}
                  className={`px-3 py-1.5 rounded transition-all uppercase tracking-wider ${
                    selectedFamily === tab.id
                      ? 'bg-[#211D1A] text-white shadow-sm'
                      : 'bg-white text-[#5A524A] border border-[#E6DEC8] hover:border-[#211D1A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => (
              <article
                key={p.id}
                className="bg-white border border-[#E6DEC8] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/5] bg-[#F2EDE4] overflow-hidden group">
                    <span className="absolute top-3 left-3 bg-[#211D1A] text-white text-[10px] font-mono px-2 py-0.5 rounded tracking-wider uppercase z-10">
                      {p.badge}
                    </span>
                    <img
                      src={p.image}
                      alt={`${p.name} 50ml Eau de Parfum`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="text-[10px] font-mono text-[#8C827A] uppercase tracking-wider">
                      50 ML EDP &bull; MEN
                    </div>
                    <h3 className="font-display text-2xl text-[#211D1A] font-semibold">{p.name}</h3>
                    <p className="text-xs text-[#5A524A] leading-relaxed line-clamp-2">
                      <strong>Notes:</strong> {p.notes}
                    </p>

                    <div className="flex items-baseline gap-3 pt-2">
                      <span className="font-display text-2xl text-[#211D1A] font-bold">₹{p.price}</span>
                      <span className="text-xs text-[#8C827A] line-through font-mono">MRP ₹{p.mrp}</span>
                      <span className="text-[11px] text-emerald-800 bg-emerald-100 font-mono px-2 py-0.5 rounded font-medium">
                        SAVE ₹{p.saveAmount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(p.name)}
                    className="w-full py-3 bg-[#9C7440] hover:bg-[#835F30] text-white rounded text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>BUY DIRECT &mdash; ₹{p.price}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 04: FRAGRANCE FAMILY FINDER
         ========================================================= */}
      <section className="py-16 bg-[#F2EDE4] border-b border-[#E6DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-mono text-[#9C7440] uppercase tracking-widest font-semibold block">
              SCENT ARCHITECTURE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#211D1A] font-light">
              Find Your <em className="italic font-serif text-[#9C7440]">Men&apos;s Fragrance</em> Family.
            </h2>
            <p className="text-xs sm:text-sm text-[#5A524A] leading-relaxed">
              Every man&apos;s scent wardrobe requires distinct olfactory profiles for office work, warm afternoons, formal evenings, and weekend gatherings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded border border-[#E6DEC8] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#9C7440] font-semibold">FAMILY // 01</span>
                <h3 className="font-display text-xl font-semibold text-[#211D1A]">Fresh &amp; Aquatic</h3>
                <p className="text-xs text-[#5A524A] leading-relaxed">
                  Crisp Calabrian bergamot, green mandarin, frosted mint, and marine accords tailored for hot daytime commutes and outdoor wear.
                </p>
              </div>
              <button
                onClick={() => setSelectedFamily('fresh')}
                className="text-xs font-mono uppercase tracking-wider text-[#9C7440] hover:text-[#211D1A] font-semibold pt-2 text-left"
              >
                EXPLORE FRESH NOTES &rarr;
              </button>
            </div>

            <div className="bg-white p-6 rounded border border-[#E6DEC8] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#9C7440] font-semibold">FAMILY // 02</span>
                <h3 className="font-display text-xl font-semibold text-[#211D1A]">Woody &amp; Earthy</h3>
                <p className="text-xs text-[#5A524A] leading-relaxed">
                  Smoky birch, Virginian cedarwood, Haitian vetiver, and clean patchouli. Structured for executive boardrooms and tailored formal wear.
                </p>
              </div>
              <button
                onClick={() => setSelectedFamily('woody')}
                className="text-xs font-mono uppercase tracking-wider text-[#9C7440] hover:text-[#211D1A] font-semibold pt-2 text-left"
              >
                EXPLORE WOODY NOTES &rarr;
              </button>
            </div>

            <div className="bg-white p-6 rounded border border-[#E6DEC8] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#9C7440] font-semibold">FAMILY // 03</span>
                <h3 className="font-display text-xl font-semibold text-[#211D1A]">Warm Spicy &amp; Amber</h3>
                <p className="text-xs text-[#5A524A] leading-relaxed">
                  Sichuan pepper, Ceylon cardamom, sweet cinnamon, and radiating ambroxan. Formulated for high evening projection and dinner events.
                </p>
              </div>
              <button
                onClick={() => setSelectedFamily('spicy')}
                className="text-xs font-mono uppercase tracking-wider text-[#9C7440] hover:text-[#211D1A] font-semibold pt-2 text-left"
              >
                EXPLORE SPICY NOTES &rarr;
              </button>
            </div>

            <div className="bg-white p-6 rounded border border-[#E6DEC8] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#9C7440] font-semibold">FAMILY // 04</span>
                <h3 className="font-display text-xl font-semibold text-[#211D1A]">Resinous Oud</h3>
                <p className="text-xs text-[#5A524A] leading-relaxed">
                  Rich oud accords, precious saffron, and warm amber resin. Opulent evening profiles built for celebration and winter gatherings.
                </p>
              </div>
              <Link
                href="/finder"
                className="text-xs font-mono uppercase tracking-wider text-[#9C7440] hover:text-[#211D1A] font-semibold pt-2 text-left"
              >
                EXPLORE OUD NOTES &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 05: TECHNICAL SPECS & 3-STAGE NOTE PYRAMID
         ========================================================= */}
      <section className="py-16 md:py-24 border-b border-[#E6DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Technical Table */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-mono text-[#9C7440] uppercase tracking-widest font-semibold block">
                SPECIFICATION REGISTER
              </span>
              <h2 className="font-display text-3xl text-[#211D1A] font-light">
                Formulation &amp; Logistics <em className="italic font-serif text-[#9C7440]">Specs.</em>
              </h2>

              <div className="border border-[#E6DEC8] rounded-lg overflow-hidden bg-white">
                <table className="w-full text-left text-xs font-mono">
                  <tbody className="divide-y divide-[#E6DEC8]">
                    <tr className="hover:bg-[#FAF8F5]">
                      <td className="p-3.5 text-[#8C827A] w-1/3">FORMULATION</td>
                      <td className="p-3.5 text-[#211D1A] font-sans font-medium">
                        Eau de Parfum (EDP) with concentrated fine fragrance oils
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAF8F5]">
                      <td className="p-3.5 text-[#8C827A]">FLACON CAPACITY</td>
                      <td className="p-3.5 text-[#211D1A] font-sans font-medium">
                        50 ml (1.7 fl oz) fine atomiser spray (500+ sprays)
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAF8F5]">
                      <td className="p-3.5 text-[#8C827A]">DISPATCH ORIGIN</td>
                      <td className="p-3.5 text-[#211D1A] font-sans font-medium">
                        Ghaziabad, Uttar Pradesh (PIN: 201012)
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAF8F5]">
                      <td className="p-3.5 text-[#8C827A]">TRANSIT MODE</td>
                      <td className="p-3.5 text-[#211D1A] font-sans font-medium">
                        Surface Courier Only (Shiprocket Network, IATA-Compliant)
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAF8F5]">
                      <td className="p-3.5 text-[#8C827A]">ESTIMATED TRANSIT</td>
                      <td className="p-3.5 text-[#211D1A] font-sans font-medium">
                        3–9 Business Days (Metro 3–5 Days with AWB tracking)
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAF8F5]">
                      <td className="p-3.5 text-[#8C827A]">PAYMENT GATEWAY</td>
                      <td className="p-3.5 text-[#211D1A] font-sans font-medium">
                        Cashfree Payments (RBI-authorised, 100% Prepaid)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Olfactory Pyramid */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-lg border border-[#E6DEC8] shadow-sm space-y-6">
              <div>
                <span className="text-[11px] font-mono text-[#9C7440] uppercase tracking-widest font-semibold block">
                  OLFACTORY ARCHITECTURE
                </span>
                <h3 className="font-display text-2xl text-[#211D1A] font-semibold mt-1">
                  The Three-Stage Note Evolution
                </h3>
                <p className="text-xs text-[#5A524A] mt-1">
                  Unlike linear synthetic colognes, our Eau de Parfum transitions dynamically across three distinct evaporation stages.
                </p>
              </div>

              {/* Pyramid Tier Selectors */}
              <div className="space-y-3">
                {/* Top Tier */}
                <div
                  onClick={() => setActiveTier('top')}
                  className={`p-4 rounded border cursor-pointer transition-all ${
                    activeTier === 'top'
                      ? 'border-[#9C7440] bg-[#9C7440]/10 shadow-sm'
                      : 'border-[#E6DEC8] bg-[#FAF8F5] hover:border-[#9C7440]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-[#9C7440]">01 // TOP NOTES (INITIAL 15–30 MINS)</span>
                    <span className="text-[#8C827A]">High Volatility</span>
                  </div>
                  <h4 className="font-display text-lg text-[#211D1A] font-medium mt-1">
                    Calabrian Bergamot &bull; Crisp Apple &bull; Frosted Mint
                  </h4>
                  <p className="text-xs text-[#5A524A] mt-1">
                    Bright, volatile citrus and herbal bursts that create the initial impression.
                  </p>
                </div>

                {/* Heart Tier */}
                <div
                  onClick={() => setActiveTier('heart')}
                  className={`p-4 rounded border cursor-pointer transition-all ${
                    activeTier === 'heart'
                      ? 'border-[#9C7440] bg-[#9C7440]/10 shadow-sm'
                      : 'border-[#E6DEC8] bg-[#FAF8F5] hover:border-[#9C7440]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-[#9C7440]">02 // HEART NOTES (2–6 HOURS)</span>
                    <span className="text-[#8C827A]">Core Character</span>
                  </div>
                  <h4 className="font-display text-lg text-[#211D1A] font-medium mt-1">
                    Smoky Birch &bull; Sichuan Pepper &bull; French Lavender
                  </h4>
                  <p className="text-xs text-[#5A524A] mt-1">
                    The core personality of the fragrance, carrying depth and structured sillage through daily meetings.
                  </p>
                </div>

                {/* Base Tier */}
                <div
                  onClick={() => setActiveTier('base')}
                  className={`p-4 rounded border cursor-pointer transition-all ${
                    activeTier === 'base'
                      ? 'border-[#9C7440] bg-[#9C7440]/10 shadow-sm'
                      : 'border-[#E6DEC8] bg-[#FAF8F5] hover:border-[#9C7440]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-[#9C7440]">03 // BASE NOTES (6–10+ HOURS)</span>
                    <span className="text-[#8C827A]">Skin Fixatives</span>
                  </div>
                  <h4 className="font-display text-lg text-[#211D1A] font-medium mt-1">
                    Virginian Cedar &bull; Ambergris Accord &bull; Clean Musk
                  </h4>
                  <p className="text-xs text-[#5A524A] mt-1">
                    Heavy, intimate molecular fixatives that anchor close to the skin all day through heat and movement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 06: CORE ADVANTAGES (6 EDITORIAL PLATES)
         ========================================================= */}
      <section className="py-16 bg-[#F2EDE4] border-b border-[#E6DEC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-[#9C7440] uppercase tracking-widest font-semibold block">
              CORE ADVANTAGES // THE STANDARDS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#211D1A] font-light">
              The Standards of <em className="italic font-serif text-[#9C7440]">Honest Parfumerie.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded border border-[#E6DEC8] space-y-2">
              <div className="text-xs font-mono text-[#9C7440] font-semibold">PLATE I.</div>
              <h3 className="font-display text-lg font-semibold text-[#211D1A]">Direct-to-Consumer Value</h3>
              <p className="text-xs text-[#5A524A] leading-relaxed">
                By eliminating mall storefront rentals and retail middleman margins, we pass full ingredient value directly to the customer starting at ₹499 (MRP ₹700).
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-[#E6DEC8] space-y-2">
              <div className="text-xs font-mono text-[#9C7440] font-semibold">PLATE II.</div>
              <h3 className="font-display text-lg font-semibold text-[#211D1A]">Engineered for Indian Climate</h3>
              <p className="text-xs text-[#5A524A] leading-relaxed">
                Formulated specifically to endure high heat and humidity without breaking down. Our higher oil concentrations anchor notes through daily commutes.
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-[#E6DEC8] space-y-2">
              <div className="text-xs font-mono text-[#9C7440] font-semibold">PLATE III.</div>
              <h3 className="font-display text-lg font-semibold text-[#211D1A]">Standard 50ml Eau de Parfum</h3>
              <p className="text-xs text-[#5A524A] leading-relaxed">
                Poured in 50ml Eau de Parfum format. This sizing provides 500+ fine atomised sprays, making it easy to rotate between daytime fresh and evening signatures.
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-[#E6DEC8] space-y-2">
              <div className="text-xs font-mono text-[#9C7440] font-semibold">PLATE IV.</div>
              <h3 className="font-display text-lg font-semibold text-[#211D1A]">IATA-Compliant Surface Transit</h3>
              <p className="text-xs text-[#5A524A] leading-relaxed">
                Strictly compliant with civil aviation (IATA) safety rules for ethanol goods. All shipments travel safely via verified ground surface logistics in 3–9 business days.
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-[#E6DEC8] space-y-2">
              <div className="text-xs font-mono text-[#9C7440] font-semibold">PLATE V.</div>
              <h3 className="font-display text-lg font-semibold text-[#211D1A]">100% Prepaid Security</h3>
              <p className="text-xs text-[#5A524A] leading-relaxed">
                Transactions processed through Cashfree Payments (RBI-authorised). Operating prepaid-only eliminates high return courier waste, keeping prices fair.
              </p>
            </div>

            <div className="bg-white p-6 rounded border border-[#E6DEC8] space-y-2">
              <div className="text-xs font-mono text-[#9C7440] font-semibold">PLATE VI.</div>
              <h3 className="font-display text-lg font-semibold text-[#211D1A]">7-Day Unopened Returns</h3>
              <p className="text-xs text-[#5A524A] leading-relaxed">
                Clean 7-day return policy from delivery date for unopened bottles in original packaging. If an item arrives damaged, we cover return shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 07: LEAD CONSULTATION FORM (DPDP ACT 2023 COMPLIANT)
         ========================================================= */}
      <section id="lead-form" className="py-16 md:py-24 border-b border-[#E6DEC8]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-mono text-[#9C7440] uppercase tracking-widest font-semibold block">
              PERSONALIZED CONSULTATION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#211D1A] font-light">
              Request Olfactory <em className="italic font-serif text-[#9C7440]">Recommendations.</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#5A524A]">
              Tell us your fragrance preference. Our specialists will send you personalized 50ml Eau de Parfum recommendations within 24 hours.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E6DEC8] shadow-sm">
            {formSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="font-display text-2xl text-[#211D1A] font-semibold">
                  Consultation Request Received
                </h3>
                <p className="text-xs text-[#5A524A] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. An olfactory specialist will review your preference for <strong>{scentPreference}</strong> profiles and contact you via your provided details.
                </p>
                <div className="text-[11px] font-mono text-[#8C827A] pt-4 border-t border-[#E6DEC8]">
                  REF: MEN-EDP-{Math.floor(100000 + Math.random() * 900000)} &bull; DPDP ACT 2023 COMPLIANT
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitLeadForm} className="space-y-5" noValidate>
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded font-sans">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#211D1A] mb-1.5 font-semibold">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full px-3.5 py-2.5 rounded border border-[#E6DEC8] bg-[#FAF8F5] text-xs font-sans text-[#211D1A] focus:outline-none focus:border-[#9C7440]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#211D1A] mb-1.5 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vikram@example.com"
                      className="w-full px-3.5 py-2.5 rounded border border-[#E6DEC8] bg-[#FAF8F5] text-xs font-sans text-[#211D1A] focus:outline-none focus:border-[#9C7440]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#211D1A] mb-1.5 font-semibold">
                      Mobile (+91 10-digit)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      maxLength={10}
                      className="w-full px-3.5 py-2.5 rounded border border-[#E6DEC8] bg-[#FAF8F5] text-xs font-sans text-[#211D1A] focus:outline-none focus:border-[#9C7440]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#211D1A] mb-1.5 font-semibold">
                    Preferred Men&apos;s Fragrance Direction
                  </label>
                  <select
                    value={scentPreference}
                    onChange={(e) => setScentPreference(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-[#E6DEC8] bg-[#FAF8F5] text-xs font-sans text-[#211D1A] focus:outline-none focus:border-[#9C7440]"
                  >
                    <option value="fresh">Fresh (Calabrian Bergamot, Marine, Crisp Apple)</option>
                    <option value="woody">Woody (Cedarwood, Smoky Birch, Vetiver)</option>
                    <option value="spicy">Spicy (Sichuan Pepper, Cardamom, Ambroxan)</option>
                    <option value="oud">Oud (Smoky Resin, Ambergris, Oriental)</option>
                    <option value="gourmand">Gourmand (Warm Vanilla, Toffee Wood, Tonka)</option>
                    <option value="not_sure">Not sure (Recommend based on daily routine)</option>
                  </select>
                </div>

                {/* DPDP Act 2023 Mandatory Consent */}
                <div className="pt-2 space-y-3 text-xs text-[#5A524A]">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dpdpConsent}
                      onChange={(e) => setDpdpConsent(e.target.checked)}
                      className="mt-0.5 rounded border-[#E6DEC8] text-[#9C7440] focus:ring-[#9C7440]"
                      required
                    />
                    <span className="leading-relaxed">
                      <strong>Mandatory Consent:</strong> I agree to being contacted regarding fragrance recommendations and to data processing per the{' '}
                      <Link href="/compliance" className="text-[#9C7440] underline">
                        Privacy Policy
                      </Link>
                      . Consent can be withdrawn anytime.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-0.5 rounded border-[#E6DEC8] text-[#9C7440] focus:ring-[#9C7440]"
                    />
                    <span className="leading-relaxed">
                      <strong>Optional:</strong> Keep me informed about new limited batch releases and seasonal discounts via WhatsApp.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#9C7440] hover:bg-[#835F30] text-white rounded text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-sm"
                >
                  REQUEST RECOMMENDATION &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 08: FREQUENTLY ASKED QUESTIONS (ACCORDION)
         ========================================================= */}
      <section className="py-16 md:py-24 bg-[#F2EDE4] border-b border-[#E6DEC8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-mono text-[#9C7440] uppercase tracking-widest font-semibold block">
              CLARIFICATIONS &amp; POLICIES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#211D1A] font-light">
              Frequently Asked <em className="italic font-serif text-[#9C7440]">Questions.</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#5A524A]">
              Clear, factual answers regarding delivery times, formulation, prepaid payments, and return eligibility.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E6DEC8] rounded-lg overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-sans text-sm font-semibold text-[#211D1A]"
                  aria-expanded={openFaqIndex === idx}
                >
                  <span>{faq.q}</span>
                  <span className="text-lg text-[#9C7440] font-mono">
                    {openFaqIndex === idx ? '−' : '+'}
                  </span>
                </button>

                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#5A524A] leading-relaxed border-t border-[#E6DEC8]/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 09: FINAL HIGH-INTENT CTA BLOCK
         ========================================================= */}
      <section className="py-16 md:py-20 bg-[#211D1A] text-white text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-5">
          <span className="text-[11px] font-mono text-[#C59A58] uppercase tracking-widest font-semibold block">
            ELEVATE YOUR SIGNATURE PRESENCE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-white font-light">
            Experience Haute Parfumerie <em className="italic font-serif text-[#C59A58]">From ₹499.</em>
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF8F5]/80 max-w-lg mx-auto leading-relaxed">
            Pan-India surface courier delivery in 3–9 business days. 100% secure prepaid checkout via Cashfree RBI-authorised gateway.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href="#mens-collection"
              className="px-6 py-3.5 bg-[#C59A58] text-[#211D1A] hover:bg-[#b08746] rounded text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-md"
            >
              SHOP MEN&apos;S EDP &mdash; FROM ₹499
            </a>
            <Link
              href="/finder"
              className="px-6 py-3.5 border border-white/30 text-white hover:bg-white hover:text-[#211D1A] rounded text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
            >
              TAKE SCENT DIAGNOSTIC QUIZ &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          STICKY MOBILE ACTION BAR
         ========================================================= */}
      <aside className="sm:hidden fixed bottom-0 left-0 w-full z-40 bg-white border-t border-[#E6DEC8] p-3 flex items-center gap-2 shadow-2xl">
        <a
          href="#mens-collection"
          className="flex-1 py-2.5 bg-[#9C7440] text-white text-center rounded text-xs font-mono uppercase tracking-wider font-semibold"
        >
          EXPLORE EDP &mdash; ₹499
        </a>
        <Link
          href="/finder"
          className="px-3 py-2.5 border border-[#211D1A] text-[#211D1A] text-center rounded text-xs font-mono uppercase tracking-wider font-semibold"
        >
          QUIZ &rarr;
        </Link>
      </aside>
    </div>
  );
}
