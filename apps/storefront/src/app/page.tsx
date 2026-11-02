'use client';

import React, { useState, useEffect } from 'react';
import { Wordmark, Button, Badge, ScentFamilyChip, ScentFamily, Card } from '@lamaia/ui';

interface Variant {
  id: string;
  name: string;
  tag: string;
  family: ScentFamily;
  tagStyle: string;
  notes: string;
  description: string;
  image: string;
  mrpPaise: number;
  dealPaise: number;
}

const variants: Variant[] = [
  {
    id: 'chrono-woods',
    name: 'Chrono Woods',
    tag: 'Bold Woody • 28% Extrait',
    family: 'woody',
    tagStyle: 'border-[#8A6A4F]/40 text-[#8A6A4F] bg-[#8A6A4F]/10',
    notes: 'Iso E Super, Aged Atlas Cedar, Smoky Vetiver & Bergamot',
    description:
      'A commanding, architectural woody scent anchored by heavy-molecular Iso E Super and 45-day vault-cured cedar. Built for intense Indian commutes and executive boardrooms.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
    mrpPaise: 189900,
    dealPaise: 139900,
  },
  {
    id: 'eternal-amber',
    name: 'Eternal Amber',
    tag: 'Warm Amber • 28% Extrait',
    family: 'amber',
    tagStyle: 'border-[#B5763A]/40 text-[#B5763A] bg-[#B5763A]/10',
    notes: 'Golden Benzoin, Spiced Tonka, Madagascar Vanilla & Labdanum',
    description:
      'Warm, seductive, and resinous. High-density amber resins fuse with natural skin ceramides to project a magnetic personal scent bubble that lingers into the late night.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
    mrpPaise: 189900,
    dealPaise: 139900,
  },
  {
    id: 'infinity-bloom',
    name: 'Infinity Bloom',
    tag: 'Floral Sillage • 28% Extrait',
    family: 'floral',
    tagStyle: 'border-[#C98B8B]/40 text-[#C98B8B] bg-[#C98B8B]/10',
    notes: 'Night-Blooming Sambac Jasmine, Damask Rose, Ambroxan & Neroli',
    description:
      'An opulent floral extrait engineered to survive humid tropical monsoons. High-molecular Ambroxan anchors delicate Indian jasmine petals so they never sour or fade.',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
    mrpPaise: 189900,
    dealPaise: 139900,
  },
  {
    id: '24-hour-oud',
    name: '24-Hour Oud',
    tag: 'Signature Oud • 28% Extrait',
    family: 'woody',
    tagStyle: 'border-[#9C7440]/40 text-[#9C7440] bg-[#9C7440]/10',
    notes: 'Royal Assam Agarwood, Saffron, Dark Leather & Smoked Patchouli',
    description:
      'A majestic pure extrait statement. Wild-harvested Assam oud layered with smoky leather and saffron, designed for grand weddings and multi-hour festive celebrations.',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
    mrpPaise: 189900,
    dealPaise: 139900,
  },
];

const scentFamiliesList: { family: ScentFamily; label: string; desc: string }[] = [
  { family: 'floral', label: 'Floral', desc: 'Jasmine Sambac, Damask Rose, Iris' },
  { family: 'woody', label: 'Woody', desc: 'Mysore Sandalwood, Cedar, Vetiver' },
  { family: 'amber', label: 'Amber', desc: 'Golden Resins, Labdanum, Spiced Tonka' },
  { family: 'fresh', label: 'Fresh', desc: 'Dewy Green Tea, Ozone, Petrichor' },
  { family: 'citrus', label: 'Citrus', desc: 'Bergamot, Bitter Orange, Neroli' },
  { family: 'gourmand', label: 'Gourmand', desc: 'Cardamom Pods, Dark Cocoa, Saffron' },
  { family: 'earthy', label: 'Earthy', desc: 'Terracotta, Moist Forest Soil, Mitti' },
];

const recentBuyersList = [
  { name: 'Vikramaditya R.', city: 'Hyderabad', item: 'Chrono Woods Extrait', time: '3 mins ago' },
  { name: 'Neha K.', city: 'Gurugram', item: 'Infinity Bloom Extrait', time: '7 mins ago' },
  { name: 'Saurabh J.', city: 'Ahmedabad', item: '24-Hour Oud Extrait', time: '12 mins ago' },
  { name: 'Ananya M.', city: 'Bengaluru', item: 'Eternal Amber Extrait', time: '16 mins ago' },
  { name: 'Rohit D.', city: 'Mumbai', item: 'Chrono Woods Extrait', time: '21 mins ago' },
];

export default function HomePage() {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0]);
  const [activeTier, setActiveTier] = useState<'top' | 'heart' | 'base'>('base');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isStrategyOpen, setIsStrategyOpen] = useState(false);
  const [strategyTab, setStrategyTab] = useState<'ads' | 'audience' | 'science' | 'offer' | 'gtm'>('ads');
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [stickyBarVisible, setStickyBarVisible] = useState(false);
  const [buyerIndex, setBuyerIndex] = useState(0);
  const [showBuyerToast, setShowBuyerToast] = useState(false);

  // Checkout form state
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    variantSelect: variants[0].name,
    deliveryCity: '',
    pincode: '',
    paymentMethod: 'prepaid',
    consent: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync form dropdown when variant changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, variantSelect: selectedVariant.name }));
  }, [selectedVariant]);

  // Buyer toast cycle
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBuyerToast(true);
      const hideTimer = setTimeout(() => setShowBuyerToast(false), 5500);
      return () => clearTimeout(hideTimer);
    }, 4000);

    const interval = setInterval(() => {
      setBuyerIndex((prev) => (prev + 1) % recentBuyersList.length);
      setShowBuyerToast(true);
      setTimeout(() => setShowBuyerToast(false), 5500);
    }, 22000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Sticky CTA scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero');
      const orderForm = document.getElementById('order-form');
      if (!hero || !orderForm) return;

      const heroBottom = hero.getBoundingClientRect().bottom;
      const formTop = orderForm.getBoundingClientRect().top;
      const formBottom = orderForm.getBoundingClientRect().bottom;

      if (heroBottom < 100 && (formTop > window.innerHeight || formBottom < 0)) {
        setStickyBarVisible(true);
      } else {
        setStickyBarVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exit intent
  useEffect(() => {
    let triggered = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) {
        triggered = true;
        setIsExitOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleVariantSelect = (v: Variant) => {
    setSelectedVariant(v);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderPayload = {
      orderId: 'LM-' + Math.floor(100000 + Math.random() * 900000),
      customerName: formData.fullName,
      customerPhone: formData.mobileNumber,
      customerEmail: formData.emailAddress,
      variantSelected: formData.variantSelect,
      city: formData.deliveryCity,
      pincode: formData.pincode,
      paymentMethod: formData.paymentMethod === 'prepaid' ? 'Prepaid Express (UPI/Card)' : 'Cash on Delivery',
      amount: '₹1,399',
      discountCode: 'LASTING20',
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem('lamaia_reservation_order', JSON.stringify(orderPayload));
    } catch {
      // Safe fallback
    }

    // Redirect to Thank-You Page
    setTimeout(() => {
      window.location.href = '/thank-you';
    }, 400);
  };

  const currentBuyer = recentBuyersList[buyerIndex];

  return (
    <div className="relative text-ink">
      {/* 1. Promotional Urgency Banner */}
      <aside
        className="sticky top-0 z-50 bg-[#211D1A] text-surface border-b border-[#3E3731] py-2 px-4 text-xs font-sans text-center transition-all shadow-md"
        aria-label="Google Ads Offer"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 font-medium text-accent">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            Ad Exclusive:
          </span>
          <span>
            Use Code <strong className="text-accent underline font-semibold">LASTING20</strong> for Flat 20% OFF
            + Free 2ml 12-Hour Wear-Test Vial &amp; Travel Atomizer.
          </span>
          <span className="text-surface/80 bg-surface/10 px-2 py-0.5 rounded text-[11px] hidden sm:inline-block">
            Only 14 Discovery Allocations Left Today
          </span>
        </div>
      </aside>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-line/60 bg-gradient-to-b from-surface via-surface-raised to-surface" id="hero">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct-Response Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent" className="py-1 px-3">
                Ad Group 4 &bull; 28% Extrait de Parfum
              </Badge>
              <Badge variant="surface-only">Surface Express Transit Pan-India</Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-light text-ink tracking-tight leading-[1.12]">
              The science-backed{' '}
              <span className="italic font-normal text-accent underline decoration-accent/30 underline-offset-8">
                long lasting perfume
              </span>{' '}
              built to endure 12+ hours in Indian heat.
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary font-sans leading-relaxed max-w-2xl font-light">
              Tired of luxury fragrances evaporating before your morning transit ends?{' '}
              <strong className="font-medium text-ink">la maia</strong> fuses{' '}
              <strong className="font-medium text-ink">28% pure French essence oils</strong> with heat-resistant{' '}
              <strong className="font-medium text-accent">Climate-Lock™ molecular fixatives</strong>—delivering
              unhurried projection from 8 AM commutes through late-night dinners.
            </p>

            {/* 4 Value Proof Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-surface border border-line p-3 rounded text-center space-y-1">
                <div className="text-accent text-sm font-semibold">12H+ Wear</div>
                <div className="text-[11px] text-ink-secondary font-sans">Verified Skin Retention</div>
              </div>
              <div className="bg-surface border border-line p-3 rounded text-center space-y-1">
                <div className="text-accent text-sm font-semibold">42°C Tested</div>
                <div className="text-[11px] text-ink-secondary font-sans">Heat &amp; Sweat Shield</div>
              </div>
              <div className="bg-surface border border-line p-3 rounded text-center space-y-1">
                <div className="text-accent text-sm font-semibold">3X Pure Oil</div>
                <div className="text-[11px] text-ink-secondary font-sans">vs 8% Diluted EDT</div>
              </div>
              <div className="bg-surface border border-line p-3 rounded text-center space-y-1">
                <div className="text-accent text-sm font-semibold">Risk-Free</div>
                <div className="text-[11px] text-ink-secondary font-sans">12H Wear Test Guarantee</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a href="#order-form" className="flex-1 sm:flex-initial">
                <Button size="lg" variant="primary" className="w-full sm:w-auto shadow-md">
                  Claim 20% OFF + Free 2ml Test Vial
                </Button>
              </a>
              <a href="#concentration-chart" className="flex-1 sm:flex-initial">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  View Oil Spectrum
                </Button>
              </a>
              <button
                type="button"
                onClick={() => setIsStrategyOpen(true)}
                className="text-xs uppercase tracking-wider text-accent hover:text-accent-hover font-sans border border-accent/40 rounded px-3 py-2 text-center"
              >
                Strategy Blueprint
              </button>
            </div>

            {/* Wear test note & Social proof */}
            <div className="pt-4 border-t border-line/50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-sans text-ink-secondary">
                <svg className="w-4 h-4 text-emerald-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>
                  <strong>Risk-Free Trial:</strong> Test the included 2ml sample vial first. Keep 100ml sealed. If not
                  convinced after 12 hours, return for a 100% full refund.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    className="w-8 h-8 rounded-full border-2 border-surface object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Vikramaditya"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-surface object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Neha"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-surface object-cover"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                    alt="Saurabh"
                  />
                </div>
                <div className="text-xs font-sans text-ink-secondary">
                  <span className="text-amber-700 font-semibold">★★★★★ 4.92 / 5</span> rating across{' '}
                  <strong className="text-ink">4,820+ verified Indian wearers</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Bottle Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#181512] text-surface rounded-lg p-6 sm:p-8 border border-[#3E3731] shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
                <span className="bg-accent/20 border border-accent/40 text-accent text-[11px] font-sans uppercase tracking-widest px-2.5 py-0.5 rounded">
                  28% Extrait
                </span>
                <span className="bg-white/10 text-surface/80 text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded">
                  Climate-Lock™
                </span>
              </div>

              <div className="text-center pt-4">
                <div className="w-56 h-64 sm:w-64 sm:h-72 mx-auto relative rounded overflow-hidden shadow-inner border border-white/10 group">
                  <img
                    src={selectedVariant.image}
                    alt={selectedVariant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-accent">
                      la maia atelier &bull; 100ml
                    </span>
                    <h3 className="text-xl font-display text-surface">{selectedVariant.name}</h3>
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t border-[#2E2823] pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-surface/60 line-through">
                      MRP ₹{(selectedVariant.mrpPaise / 100).toLocaleString('en-IN')}
                    </span>
                    <div className="text-2xl font-display text-accent font-medium">
                      ₹{(selectedVariant.dealPaise / 100).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <span className="bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-xs font-sans uppercase tracking-wider px-2.5 py-1 rounded">
                    FLAT 20% OFF + FREE GIFT
                  </span>
                </div>

                <p className="text-xs font-sans text-surface/70 leading-relaxed">
                  Includes 100ml Extrait Bottle + 2ml Wear-Test Sample + Brass Refillable Travel Atomizer.
                </p>

                <div className="pt-2">
                  <a href="#order-form">
                    <Button variant="primary" className="w-full">
                      Reserve {selectedVariant.name}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Indian Climate Evaporation Challenge */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-line/60 bg-surface">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold">
              The Evaporation Epidemic
            </span>
            <h2 className="text-3xl sm:text-4xl font-display text-ink leading-tight">
              Why 90% of perfumes fail in Indian weather within two hours.
            </h2>
            <p className="text-sm sm:text-base font-sans text-ink-secondary font-light leading-relaxed">
              If expensive European fragrances turn into undetectable skin scents by 11 AM, you are not imagining it.
              They simply were never formulated for the Indian climate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-raised border border-line p-8 rounded space-y-4 shadow-sm hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-display text-lg font-bold">
                01
              </div>
              <h3 className="text-xl font-display text-ink">35°C–45°C Heat Destroys Fragrance Top Notes</h3>
              <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light">
                Standard perfumes rely on lightweight, volatile citrus and floral chemicals engineered for 18°C European
                autumns. In Indian tropical temperatures, heat triggers rapid flash-evaporation, vaporizing notes before
                you reach the office.
              </p>
            </div>

            <div className="bg-surface-raised border border-line p-8 rounded space-y-4 shadow-sm hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-display text-lg font-bold">
                02
              </div>
              <h3 className="text-xl font-display text-ink">Monsoon &amp; Metro Humidity Breaks Molecular Bonds</h3>
              <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light">
                High ambient humidity saturates the surrounding air, while skin sebum and sweat break down fragile
                synthetic binders. Weak Eau de Toilette sprays dissolve and turn sour under humid pressure.
              </p>
            </div>

            <div className="bg-surface-raised border border-line p-8 rounded space-y-4 shadow-sm hover:border-accent/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-display text-lg font-bold">
                03
              </div>
              <h3 className="text-xl font-display text-ink">The Fragrance Industry Dilution Secret</h3>
              <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light">
                Commercial brands labeled &ldquo;EDP&rdquo; routinely carry only 10%–12% actual oil, with 88% industrial
                alcohol. Customers pay ₹5,000 to ₹10,000 for carrier alcohol that dissipates into thin air within 90 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Breakthrough Formulation & USP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-line/60 bg-[#211D1A] text-surface">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold">
                Atelier Chemistry
              </span>
              <h2 className="text-3xl sm:text-4xl font-display text-surface leading-tight">
                Engineered with Climate-Lock™ fixatives &amp; 28% pure Extrait de Parfum.
              </h2>
              <p className="text-sm sm:text-base font-sans text-surface/80 leading-relaxed font-light">
                We rebuilt the architecture of fine fragrance specifically for the subcontinent. By anchoring
                high-molecular-weight Ambroxan and Iso E Super into our formulas, the scent physically latches to skin
                proteins, releasing fragrant sillage in slow, consistent waves.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-[#2A2420] border border-[#3E3731] p-4 rounded space-y-1">
                  <div className="text-accent font-semibold text-sm">28% Pure Artisanal Oil</div>
                  <div className="text-xs text-surface/70 font-sans">
                    3X higher oil concentration than typical market Eau de Toilette sprays.
                  </div>
                </div>
                <div className="bg-[#2A2420] border border-[#3E3731] p-4 rounded space-y-1">
                  <div className="text-accent font-semibold text-sm">Climate-Lock™ Fixatives</div>
                  <div className="text-xs text-surface/70 font-sans">
                    Macrocyclic Ambroxan anchors that resist sweat and 40°C temperatures.
                  </div>
                </div>
                <div className="bg-[#2A2420] border border-[#3E3731] p-4 rounded space-y-1">
                  <div className="text-accent font-semibold text-sm">45-Day Cold Vault Maceration</div>
                  <div className="text-xs text-surface/70 font-sans">
                    Slow esterification in temperature-regulated vaults eliminates alcohol burn.
                  </div>
                </div>
                <div className="bg-[#2A2420] border border-[#3E3731] p-4 rounded space-y-1">
                  <div className="text-accent font-semibold text-sm">UV-Shielded Glass</div>
                  <div className="text-xs text-surface/70 font-sans">
                    Apothecary glass protects delicate botanicals from UV light breakdown.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#181512] p-8 rounded-lg border border-[#3E3731] space-y-6">
              <h3 className="text-xl font-display text-accent">The 3-Phase Longevity Engine</h3>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-semibold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-surface">Hours 0–2: Dynamic Sillage Bloom</h4>
                    <p className="text-xs text-surface/70 font-sans mt-0.5">
                      Calabrian Bergamot, Pink Pepper &amp; Saffron greet the room without harsh ethanol sharp bite.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-semibold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-surface">Hours 2–7: Heat-Resistant Heart</h4>
                    <p className="text-xs text-surface/70 font-sans mt-0.5">
                      Climate-Lock™ binders prevent perspiration from diluting French lavender, damask rose, and nutmeg.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-semibold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-surface">Hours 7–12+: Heavy-Base Protein Latching</h4>
                    <p className="text-xs text-surface/70 font-sans mt-0.5">
                      High-density Ambroxan, Iso E Super, and Aged Atlas Cedar radiate personal scent presence into the night.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 6 Measurable Wearer Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-line/60 bg-surface-raised">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold">
              The Extrait Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-display text-ink">
              Six proven benefits of our 12-hour Extrait de Parfum.
            </h2>
            <p className="text-sm sm:text-base font-sans text-ink-secondary font-light">
              Walk into evening dinners, conferences, or festive gatherings with complete confidence in your scent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-surface border border-line p-6 rounded space-y-2">
              <div className="text-accent text-lg font-display font-medium">Verified 12H+ Skin Wear</div>
              <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light">
                Ambroxan molecular fixatives anchor scent oils to pulse points, eliminating the midday disappearance.
              </p>
            </div>

            <div className="bg-surface border border-line p-6 rounded space-y-2">
              <div className="text-accent text-lg font-display font-medium">Heat &amp; Humidity Shield</div>
              <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light">
                Formulated for 35°C–45°C ambient temperatures and 85%+ monsoon humidity without souring.
              </p>
            </div>

            <div className="bg-surface border border-line p-6 rounded space-y-2">
              <div className="text-accent text-lg font-display font-medium">3X Concentration (28% Extrait)</div>
              <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light">
                Genuine Extrait grade density, not diluted 8%–10% commercial department store sprays.
              </p>
            </div>

            <div className="bg-surface border border-line p-6 rounded space-y-2">
              <div className="text-accent text-lg font-display font-medium">4 Sprays = Full-Day Coverage</div>
              <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light">
                Extreme oil density means 4 subtle sprays suffice. One 100ml bottle lasts 5 to 6 months of daily wear.
              </p>
            </div>

            <div className="bg-surface border border-line p-6 rounded space-y-2">
              <div className="text-accent text-lg font-display font-medium">Complimentary 2ml Test Vial</div>
              <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light">
                Test the 2ml sample vial first. If it does not perform for 12 hours, return the sealed 100ml box for a 100% refund.
              </p>
            </div>

            <div className="bg-surface border border-line p-6 rounded space-y-2">
              <div className="text-accent text-lg font-display font-medium">24-Hour Fabric Retention</div>
              <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light">
                Non-staining, cosmetic-grade French oils that remain active on blazers and shirts through the next morning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Visual Oil Concentration Spectrum & Fragrance Pyramid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-line/60 bg-surface" id="concentration-chart">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold">
              The Science of Sillage
            </span>
            <h2 className="text-3xl sm:text-4xl font-display text-ink">
              Visual Oil Concentration &amp; Longevity Benchmark
            </h2>
            <p className="text-sm font-sans text-ink-secondary">
              Comparing perfume oil concentration vs verified skin longevity in the Indian climate:
            </p>
          </div>

          {/* Progress Bars */}
          <div className="bg-surface-raised border border-line p-8 rounded-lg max-w-4xl mx-auto space-y-6">
            {/* Body Mist */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-ink font-medium">Body Mist / Deodorant Spray (1%–3% Oil)</span>
                <span className="text-ink-secondary">Fades in 45 Minutes</span>
              </div>
              <div className="w-full bg-line/40 h-4 rounded-full overflow-hidden">
                <div className="bg-stone-400 h-full rounded-full" style={{ width: '10%' }} />
              </div>
            </div>

            {/* EDT */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-ink font-medium">Eau de Toilette (EDT) (5%–8% Oil)</span>
                <span className="text-ink-secondary">Lasts 2–3 Hours</span>
              </div>
              <div className="w-full bg-line/40 h-4 rounded-full overflow-hidden">
                <div className="bg-sky-600 h-full rounded-full" style={{ width: '25%' }} />
              </div>
            </div>

            {/* Standard EDP */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-ink font-medium">Standard Department Store EDP (12%–15% Oil)</span>
                <span className="text-ink-secondary">Lasts 4–5 Hours</span>
              </div>
              <div className="w-full bg-line/40 h-4 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: '50%' }} />
              </div>
            </div>

            {/* la maia Extrait */}
            <div className="space-y-1.5 pt-2 border-t border-line/60">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-accent font-bold">la maia Intense Extrait de Parfum (28% Pure Oil)</span>
                <span className="text-emerald-800 font-bold">Verified 12 to 16+ Hours ★</span>
              </div>
              <div className="w-full bg-accent/20 h-5 rounded-full overflow-hidden p-0.5 border border-accent">
                <div className="bg-accent h-full rounded-full flex items-center justify-end pr-2 text-[10px] text-surface font-semibold" style={{ width: '92%' }}>
                  28% EXTRAIT
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Pyramid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            <div className="lg:col-span-6 space-y-3">
              <h3 className="text-xl font-display text-ink">Inverted Molecular Weight Pyramid</h3>
              <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light">
                Standard perfumes allocate 60% of their formula to quick-evaporating top notes. In contrast,{' '}
                <strong className="text-ink">la maia</strong> dedicates over{' '}
                <strong className="text-accent font-medium">55% of the formulation weight</strong> to anchored base
                fixatives that physically cling to skin lipids.
              </p>

              {/* Tier buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTier('top')}
                  className={`w-full text-left p-3 rounded border text-xs font-sans transition-all ${
                    activeTier === 'top'
                      ? 'border-accent bg-accent/10 font-medium text-ink'
                      : 'border-line bg-surface hover:border-line-dark'
                  }`}
                >
                  <div className="flex justify-between">
                    <strong>TOP NOTES (Hours 0–2)</strong>
                    <span>15% Formula Weight</span>
                  </div>
                  <div className="text-ink-secondary text-[11px] mt-0.5">
                    Calabrian Bergamot, Pink Peppercorn, Cardamom
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTier('heart')}
                  className={`w-full text-left p-3 rounded border text-xs font-sans transition-all ${
                    activeTier === 'heart'
                      ? 'border-accent bg-accent/10 font-medium text-ink'
                      : 'border-line bg-surface hover:border-line-dark'
                  }`}
                >
                  <div className="flex justify-between">
                    <strong>HEART NOTES (Hours 2–7)</strong>
                    <span>30% Formula Weight</span>
                  </div>
                  <div className="text-ink-secondary text-[11px] mt-0.5">
                    French Lavender, Damask Rose, Nutmeg, Smoky Vetiver
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTier('base')}
                  className={`w-full text-left p-3 rounded border text-xs font-sans transition-all ${
                    activeTier === 'base'
                      ? 'border-accent bg-accent/10 font-medium text-ink'
                      : 'border-line bg-surface hover:border-line-dark'
                  }`}
                >
                  <div className="flex justify-between">
                    <strong className="text-accent">CLIMATE-LOCK™ BASE NOTES (Hours 7–12+)</strong>
                    <span className="text-accent font-bold">55% Anchored Weight</span>
                  </div>
                  <div className="text-ink-secondary text-[11px] mt-0.5">
                    Ambroxan, Iso E Super, Aged Atlas Cedar, Madagascar Vanilla, Tonka
                  </div>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#211D1A] text-surface p-6 sm:p-8 rounded-lg border border-[#3E3731] space-y-4">
              <span className="text-xs uppercase tracking-widest text-accent font-sans">
                Active Tier Breakdown
              </span>

              {activeTier === 'top' && (
                <div className="space-y-3">
                  <h4 className="text-xl font-display text-surface">Top Notes: Instant Sillage Bloom (0–2h)</h4>
                  <p className="text-xs sm:text-sm font-sans text-surface/80 leading-relaxed font-light">
                    Crisp Calabrian Bergamot and green cardamom deliver an inviting initial aura when entering a room,
                    without that stinging alcohol burn characteristic of mass-market colognes.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-surface">Calabrian Bergamot</span>
                    <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-surface">Pink Peppercorn</span>
                    <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-surface">Cardamom</span>
                  </div>
                </div>
              )}

              {activeTier === 'heart' && (
                <div className="space-y-3">
                  <h4 className="text-xl font-display text-surface">Heart Notes: Heat Resilience (2–7h)</h4>
                  <p className="text-xs sm:text-sm font-sans text-surface/80 leading-relaxed font-light">
                    French Lavender, Damask Rose, and nutmeg create a resilient floral-spicy bridge that withstands
                    Indian summer heat and humid metro commutes.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-surface">French Lavender</span>
                    <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-surface">Damask Rose</span>
                    <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-surface">Smoky Vetiver</span>
                  </div>
                </div>
              )}

              {activeTier === 'base' && (
                <div className="space-y-3">
                  <h4 className="text-xl font-display text-accent">Base Notes: 55% Heavy Anchor (7–12+h)</h4>
                  <p className="text-xs sm:text-sm font-sans text-surface/80 leading-relaxed font-light">
                    The core longevity engine. Over 55% of the total formulation consists of high-molecular-weight
                    Ambroxan, Iso E Super, and aged cedarwood that fuse directly to skin ceramides for continuous
                    evening projection.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="text-[11px] bg-accent/20 border border-accent/40 px-2 py-0.5 rounded text-accent">Ambroxan (Fixative)</span>
                    <span className="text-[11px] bg-accent/20 border border-accent/40 px-2 py-0.5 rounded text-accent">Iso E Super (Velvet Aura)</span>
                    <span className="text-[11px] bg-accent/20 border border-accent/40 px-2 py-0.5 rounded text-accent">Aged Atlas Cedar (45-Day Cured)</span>
                    <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-surface">Tonka Bean</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Signature Fragrance Profiles Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-line/60 bg-surface-raised" id="variants">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold">
              The Collection
            </span>
            <h2 className="text-3xl sm:text-4xl font-display text-ink">
              Four 12-Hour Artisanal Extrait Profiles
            </h2>
            <p className="text-sm font-sans text-ink-secondary">
              Handcrafted in small batches with premium French oils. Select your signature profile:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {variants.map((v) => {
              const isSelected = selectedVariant.id === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => handleVariantSelect(v)}
                  className={`bg-surface border rounded-lg p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 relative ${
                    isSelected
                      ? 'border-accent shadow-xl ring-2 ring-accent/30 -translate-y-1'
                      : 'border-line hover:border-line-dark'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded border ${v.tagStyle}`}>
                        {v.tag}
                      </span>
                      {isSelected && (
                        <span className="text-xs text-accent font-semibold flex items-center gap-1">
                          Active ✓
                        </span>
                      )}
                    </div>

                    <div className="w-full h-44 rounded overflow-hidden relative">
                      <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-xl font-display text-ink">{v.name}</h3>
                      <p className="text-xs text-ink-secondary font-sans leading-relaxed line-clamp-3">
                        {v.description}
                      </p>
                      <div className="text-[11px] text-accent font-medium pt-1 font-sans">
                        Notes: {v.notes}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-line/60 mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-ink-secondary line-through">
                        ₹{(v.mrpPaise / 100).toLocaleString('en-IN')}
                      </span>
                      <div className="text-lg font-display text-ink font-semibold">
                        ₹{(v.dealPaise / 100).toLocaleString('en-IN')}
                      </div>
                    </div>
                    <Button size="sm" variant={isSelected ? 'primary' : 'secondary'}>
                      {isSelected ? 'Selected' : 'Select'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Scent Family Navigation Bar */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-line/60 bg-surface">
        <div className="max-w-7xl mx-auto space-y-6 text-center">
          <div className="space-y-2">
            <h3 className="text-2xl font-display text-ink">Seven Olfactive Traditions</h3>
            <p className="text-xs sm:text-sm font-sans text-ink-secondary">
              Every creation is rooted in an olfactive lineage, from night-blooming florals to ancient woods.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {scentFamiliesList.map((item) => (
              <a key={item.family} href={`/families/${item.family}`}>
                <ScentFamilyChip family={item.family} label={item.label} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Comparison Benchmark Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-line/60 bg-surface-raised" id="comparison">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold">
              The Proof in Numbers
            </span>
            <h2 className="text-3xl sm:text-4xl font-display text-ink">
              Why la maia outperforms ordinary perfumes.
            </h2>
            <p className="text-sm font-sans text-ink-secondary">
              See how our 28% Extrait de Parfum compares against generic mall perfumes:
            </p>
          </div>

          <div className="overflow-x-auto max-w-5xl mx-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans bg-surface border border-line rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="border-b border-line bg-surface-raised text-xs uppercase tracking-wider text-ink-secondary">
                  <th className="p-4">Performance Metric</th>
                  <th className="p-4 bg-accent/15 text-accent-hover font-bold border-x border-accent/30">
                    la maia (28% Extrait)
                  </th>
                  <th className="p-4">Department Store EDP</th>
                  <th className="p-4">Standard EDT Sprays</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                <tr>
                  <td className="p-4 font-medium text-ink">Verified Skin Longevity</td>
                  <td className="p-4 bg-accent/5 font-bold text-accent border-x border-accent/20">
                    ✓ 12 to 16+ Hours
                  </td>
                  <td className="p-4 text-ink-secondary">4 to 5 Hours</td>
                  <td className="p-4 text-ink-secondary">1 to 3 Hours Max</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-ink">Fragrance Oil Concentration</td>
                  <td className="p-4 bg-accent/5 font-bold text-accent border-x border-accent/20">
                    ✓ 28% (Pure Extrait)
                  </td>
                  <td className="p-4 text-ink-secondary">12% – 15%</td>
                  <td className="p-4 text-ink-secondary">5% – 8% (Diluted)</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-ink">Engineered for Indian Heat (35°C+)</td>
                  <td className="p-4 bg-accent/5 font-bold text-accent border-x border-accent/20">
                    ✓ Climate-Lock™ Shield
                  </td>
                  <td className="p-4 text-red-900/70">✗ Evaporates fast</td>
                  <td className="p-4 text-red-900/70">✗ Vanishes in sweat</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-ink">45-Day Cold Vault Maceration</td>
                  <td className="p-4 bg-accent/5 font-bold text-accent border-x border-accent/20">
                    ✓ Full Esterification
                  </td>
                  <td className="p-4 text-red-900/70">✗ Flash-blended</td>
                  <td className="p-4 text-red-900/70">✗ Zero maceration</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-ink">2ml Wear-Test Sample Included</td>
                  <td className="p-4 bg-accent/5 font-bold text-accent border-x border-accent/20">
                    ✓ Included Free
                  </td>
                  <td className="p-4 text-red-900/70">✗ None included</td>
                  <td className="p-4 text-red-900/70">✗ None included</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-ink">7-Day Money-Back Guarantee</td>
                  <td className="p-4 bg-accent/5 font-bold text-accent border-x border-accent/20">
                    ✓ 100% Risk-Free Trial
                  </td>
                  <td className="p-4 text-red-900/70">✗ No returns if unsealed</td>
                  <td className="p-4 text-red-900/70">✗ Strictly non-returnable</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-ink">Pocket Travel Sprayer</td>
                  <td className="p-4 bg-accent/5 font-bold text-accent border-x border-accent/20">
                    ✓ Complimentary Brass Atomizer
                  </td>
                  <td className="p-4 text-red-900/70">✗ Sold separately (₹499)</td>
                  <td className="p-4 text-red-900/70">✗ Not available</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-ink">Real Cost Per Spray Day</td>
                  <td className="p-4 bg-accent/5 font-bold text-accent border-x border-accent/20">
                    ✓ ~₹7.70 / day (Lasts 6 mos)
                  </td>
                  <td className="p-4 text-ink-secondary">~₹28 / day (Re-spraying)</td>
                  <td className="p-4 text-ink-secondary">~₹22 / day (Heavy use)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 10. The 12-Hour Wear-Test Challenge */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-line/60 bg-surface" id="how-it-works">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold">
              Zero Financial Risk
            </span>
            <h2 className="text-3xl sm:text-4xl font-display text-ink">
              How the 12-Hour Wear Challenge Works in 3 Easy Steps
            </h2>
            <p className="text-sm font-sans text-ink-secondary">
              We are so confident in our 28% Extrait formulation that we let you wear and test it completely on our dime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-surface-raised border border-line p-8 rounded text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent text-surface mx-auto flex items-center justify-center font-display text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-display text-ink">Order 100ml Box with Free 2ml Vial</h3>
              <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light">
                Choose your signature scent profile. Your package arrives with the 100ml sealed bottle plus a
                complimentary 2ml sample vial and pocket travel atomizer.
              </p>
            </div>

            <div className="bg-surface-raised border border-line p-8 rounded text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent text-surface mx-auto flex items-center justify-center font-display text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-display text-ink">Conduct the 12-Hour Test</h3>
              <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light">
                Keep the main 100ml box sealed. Apply 3 to 4 sprays of the complimentary 2ml sample vial at 8:00 AM
                before your morning commute or office meetings.
              </p>
            </div>

            <div className="bg-surface-raised border border-line p-8 rounded text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent text-surface mx-auto flex items-center justify-center font-display text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-display text-ink">Love It or Receive 100% Refund</h3>
              <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light">
                Check your pulse points at 8:00 PM. If you are not thoroughly captivated by its projection, contact our
                team to return the unopened 100ml box for an immediate full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Lead Generation & Order Checkout Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-line/60 bg-[#211D1A] text-surface" id="order-form">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-accent font-sans font-semibold border border-accent/40 bg-accent/10 px-3 py-1 rounded">
              Google Ads Launch Offer &bull; Code LASTING20 Applied
            </span>
            <h2 className="text-3xl sm:text-4xl font-display text-surface">
              Claim Your 12-Hour Extrait de Parfum
            </h2>
            <p className="text-xs sm:text-sm font-sans text-surface/80 max-w-xl mx-auto">
              Complete your reservation below to secure your 100ml Extrait bottle at Flat 20% OFF + Complimentary 2ml
              Wear-Test Sample &amp; Free Pocket Atomizer.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="bg-[#181512] border border-[#3E3731] rounded-lg p-6 sm:p-10 space-y-6 shadow-2xl">
            <div className="bg-accent/15 border border-accent/30 p-4 rounded flex items-center justify-between flex-wrap gap-2 text-xs font-sans">
              <div>
                <strong className="text-surface">Offer Code LASTING20 Activated:</strong>
                <span className="text-surface/80 block">Instant ₹500 discount + Free Insured Surface Transit</span>
              </div>
              <span className="bg-accent text-surface font-mono font-bold px-3 py-1 rounded text-xs">
                SAVE ₹500
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-1.5">
                <label className="text-surface/90 font-medium">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#241F1B] border border-[#3E3731] rounded p-2.5 text-surface focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-surface/90 font-medium">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="e.g. 9876543210 (10 digits)"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  className="w-full bg-[#241F1B] border border-[#3E3731] rounded p-2.5 text-surface focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-surface/90 font-medium">Email Address (For Tracking) *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. vikram@example.com"
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                  className="w-full bg-[#241F1B] border border-[#3E3731] rounded p-2.5 text-surface focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-surface/90 font-medium">Preferred Fragrance Profile *</label>
                <select
                  value={formData.variantSelect}
                  onChange={(e) => {
                    const match = variants.find((v) => v.name === e.target.value);
                    if (match) setSelectedVariant(match);
                    setFormData({ ...formData, variantSelect: e.target.value });
                  }}
                  className="w-full bg-[#241F1B] border border-[#3E3731] rounded p-2.5 text-surface focus:outline-none focus:border-accent"
                >
                  {variants.map((v) => (
                    <option key={v.id} value={v.name}>
                      {v.name} — {v.notes}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-surface/90 font-medium">Delivery City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai, Bengaluru, Delhi NCR"
                  value={formData.deliveryCity}
                  onChange={(e) => setFormData({ ...formData, deliveryCity: e.target.value })}
                  className="w-full bg-[#241F1B] border border-[#3E3731] rounded p-2.5 text-surface focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-surface/90 font-medium">Pin Code (Express Surface Delivery) *</label>
                <input
                  type="text"
                  required
                  pattern="[0-9]{6}"
                  placeholder="e.g. 400001 (6 digits)"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full bg-[#241F1B] border border-[#3E3731] rounded p-2.5 text-surface focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-sans">
              <label className="text-surface/90 font-medium">Payment Method Preference</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full bg-[#241F1B] border border-[#3E3731] rounded p-2.5 text-surface focus:outline-none focus:border-accent"
              >
                <option value="prepaid">Prepaid Express (UPI, Cards, NetBanking) &bull; Priority Dispatch</option>
                <option value="cod">Cash on Delivery (Available across 19,000+ PIN codes)</option>
              </select>
            </div>

            {/* Live Order Summary */}
            <div className="bg-[#241F1B] border border-[#3E3731] rounded p-4 space-y-2 text-xs font-sans">
              <div className="flex justify-between text-surface/80">
                <span>la maia 100ml Extrait de Parfum ({selectedVariant.name}):</span>
                <span>₹1,899</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Voucher Code [LASTING20]:</span>
                <span>- ₹500 (20% OFF)</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Complimentary 2ml 12-Hour Wear-Test Vial:</span>
                <span>FREE (Worth ₹299)</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Brass Refillable Travel Atomizer:</span>
                <span>FREE (Worth ₹499)</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Insured Surface Transit Pan-India:</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-surface pt-2 border-t border-[#3E3731]">
                <span>Total Payable:</span>
                <span className="text-accent text-base">₹1,399</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs font-sans text-surface/70">
              <input
                type="checkbox"
                required
                id="consentCheck"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-0.5 rounded border-[#3E3731] bg-[#241F1B] text-accent focus:ring-accent"
              />
              <label htmlFor="consentCheck">
                I agree to receive order tracking updates via SMS/WhatsApp. I understand this order is protected by the
                7-Day 12-Hour Wear-Test Guarantee.
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              variant="primary"
              className="w-full text-sm font-sans"
              isLoading={isSubmitting}
            >
              Confirm Order &amp; Claim 20% Discount
            </Button>

            <div className="flex items-center justify-center gap-6 pt-2 text-[11px] font-sans text-surface/60 flex-wrap">
              <span>🔒 256-Bit Secure Encryption</span>
              <span>🚚 Dispatches within 24 Hours</span>
              <span>🔄 7-Day Risk-Free Return</span>
            </div>
          </form>
        </div>
      </section>

      {/* 12. Real Commuter Testimonials & Trust Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-line/60 bg-surface-raised" id="reviews">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold">
              Real Commuter Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-display text-ink">
              Verified 12+ Hour Wearers Across India
            </h2>
            <p className="text-sm font-sans text-ink-secondary">
              Real feedback from professionals who put our Climate-Lock™ formula to the test in real Indian conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="bg-surface border border-line p-6 rounded space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-amber-700 text-sm">★★★★★</div>
                <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light italic">
                  &ldquo;Sprayed Chrono Woods at 8:30 AM before riding my motorcycle to Hitech City in Hyderabad heat. At 9:30 PM
                  at the gym, I could still smell the cedar and amber clearly. Even my trainer asked what perfume I was wearing.
                  Incredible longevity for an Indian brand.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-line/60">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Vikramaditya"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-display font-medium text-ink">Vikramaditya Rao</h4>
                  <span className="text-[11px] text-ink-secondary font-sans">
                    Hyderabad &bull; Verified 13H Wear
                  </span>
                </div>
              </div>
            </article>

            <article className="bg-surface border border-line p-6 rounded space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-amber-700 text-sm">★★★★★</div>
                <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light italic">
                  &ldquo;The only long lasting perfume that survives Delhi&rsquo;s May heat and humidity. I wore Infinity Bloom to
                  an outdoor client lunch and then an evening dinner. My jacket still carried the scent the next morning. Completely
                  enchanted!&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-line/60">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Neha"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-display font-medium text-ink">Neha Kapoor</h4>
                  <span className="text-[11px] text-ink-secondary font-sans">
                    Gurugram, NCR &bull; Verified 14H Wear
                  </span>
                </div>
              </div>
            </article>

            <article className="bg-surface border border-line p-6 rounded space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="text-amber-700 text-sm">★★★★★</div>
                <p className="text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed font-light italic">
                  &ldquo;You can instantly tell the 28% oil quality compared to watery departmental store sprays. Just 3 sprays of
                  24-Hour Oud fill the room smoothly without giving headaches. I tested the 2ml sample first and kept the bottle
                  immediately.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-line/60">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
                  alt="Saurabh"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-display font-medium text-ink">Saurabh Jain</h4>
                  <span className="text-[11px] text-ink-secondary font-sans">
                    Ahmedabad &bull; Verified 16H Wear
                  </span>
                </div>
              </div>
            </article>
          </div>

          {/* Trust stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-line/60 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-display text-accent font-semibold">94.2%</div>
              <div className="text-xs text-ink-secondary font-sans">Verified 12H Scent Retention</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-display text-accent font-semibold">18,400+</div>
              <div className="text-xs text-ink-secondary font-sans">Bottles Shipped in 320 Cities</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-display text-accent font-semibold">4.92 / 5</div>
              <div className="text-xs text-ink-secondary font-sans">Overall Customer Rating</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-display text-accent font-semibold">0.8%</div>
              <div className="text-xs text-ink-secondary font-sans">Return Rate (Industry: 9%)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Accordion FAQs (All 10 Questions) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-line/60 bg-surface" id="faq">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-sans font-semibold">
              Questions &amp; Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-display text-ink">
              Frequently Asked Questions
            </h2>
            <p className="text-sm font-sans text-ink-secondary">
              Everything you need to know about oil concentration, weather testing, pulse points, and our risk-free trial.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: '1. Why do most luxury perfumes fade so quickly in Indian heat and humidity?',
                a: 'Most designer perfumes are crafted for temperate European weather where temperatures range from 15°C to 22°C. In India, summer temperatures cross 40°C with high humidity. This ambient heat accelerates the vapor pressure of ethanol, vaporizing light top notes in 30 minutes. la maia counters this with 28% Extrait de Parfum concentration and Climate-Lock™ molecular fixatives that physically slow evaporation.',
              },
              {
                q: '2. What is the difference between Extrait de Parfum, EDP, and EDT?',
                a: 'The difference lies in pure fragrance oil versus carrier alcohol:\n• Extrait de Parfum (la maia): 25%–30% pure oil, lasts 12 to 16+ hours with deep sillage.\n• Eau de Parfum (EDP): 12%–18% oil, lasts 4 to 6 hours under normal conditions.\n• Eau de Toilette (EDT): 5%–10% oil, lasts only 2 to 3 hours before vanishing.\n• Deodorant/Body Mist: 1%–3% oil, dissipates within 45 minutes.',
              },
              {
                q: '3. What does "45-day vault maceration" mean and why does it matter?',
                a: 'Maceration is the fine perfumery process where raw essence oils rest in temperature-regulated dark vaults. Over 45 days, individual volatile aroma chemicals undergo natural esterification and molecular bonding. Commercial perfumes skip this step to reduce inventory lag, causing a harsh alcohol burst. la maia cold-cures every batch for 45 days for a smooth, mature scent that clings to skin.',
              },
              {
                q: '4. How exactly does Climate-Lock™ fixative technology work?',
                a: 'Climate-Lock™ utilizes heavy macrocyclic musks and engineered molecular anchors including Ambroxan and Iso E Super. These high-density molecules possess a low evaporation curve and bind to natural skin ceramides. When sweat or ambient heat hits your skin, the fixative forms a breathable micro-film that releases the scent gradually rather than burning off in one swift evaporation burst.',
              },
              {
                q: '5. How should I apply la maia for maximum 12+ hour projection?',
                a: 'Because of our 28% concentration, you only need 3 to 4 sprays. Apply directly onto moisturized pulse points: one spray on each side of the lower neck/collarbones, one spray on inner wrists, and optionally one spray onto the fabric of your shirt or blazer. Pro tip: Never rub wrists together after spraying, as friction crushes delicate top notes.',
              },
              {
                q: '6. Does this perfume perform differently on skin versus fabrics?',
                a: 'Yes. Skin has warmth, which creates personal scent projection (sillage) that wafts when you walk or gesture. Fabrics (cotton, linen, wool, denim) do not have body heat, meaning evaporation is dramatically slowed down. While la maia lasts 12+ hours on skin, it easily lasts 24 to 48 hours on shirts and blazers without staining.',
              },
              {
                q: '7. How does the 7-Day 12-Hour Wear-Test Guarantee work?',
                a: 'Every order arrives with your sealed 100ml bottle plus a separate complimentary 2ml sample vial. Test the 2ml vial for up to 7 days in your real routine. If you are not completely satisfied with the 12-hour longevity and fragrance projection, contact our WhatsApp Concierge to return the unopened 100ml bottle for an immediate 100% refund.',
              },
              {
                q: '8. Will this high oil concentration stain white shirts or fabrics?',
                a: 'No. la maia uses ultra-filtered cosmetic-grade French fragrance oils without artificial dyes or heavy colorants. When sprayed from a recommended distance of 15 to 20 cm, the fine micro-mist distributes evenly and will not stain cotton, linen, silk blends, or white dress shirts.',
              },
              {
                q: '9. How many sprays do I get, and how long does a 100ml bottle last?',
                a: 'Each 100ml bottle delivers approximately 950 to 1,000 fine atomizer sprays. Since you only require 3 to 4 sprays once per day (no midday re-spraying needed), a single 100ml bottle comfortably lasts 6 to 8 months of daily use. That equates to less than ₹8 per day for luxury extrait performance.',
              },
              {
                q: '10. How fast is delivery across India, and do you offer Cash on Delivery?',
                a: 'All orders dispatch within 24 hours via secure surface express transit (BlueDart, Delhivery) in compliance with dangerous goods regulations. Metro deliveries take 2 to 3 business days; other cities take 3 to 4 days. Cash on Delivery (COD) is available across 19,000+ pin codes. Prepaid orders receive priority dispatch and an extra ₹100 instant confirmation saving.',
              },
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-surface-raised border border-line rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-sans text-sm font-semibold text-ink hover:text-accent transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-light text-accent flex-shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm font-sans text-ink-secondary leading-relaxed border-t border-line/40 bg-surface/50 whitespace-pre-line font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 14. 100% Risk-Free Guarantee Box & Final Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-line/60 bg-surface">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#241F1B] via-[#1B1916] to-[#141210] border-2 border-accent text-surface rounded-xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-accent text-[#1B1916] mx-auto flex items-center justify-center font-bold text-2xl shadow-lg">
            🛡️
          </div>

          <span className="text-xs uppercase tracking-widest text-accent font-sans font-semibold">
            Zero Financial Risk &bull; 7-Day Wear Test
          </span>

          <h2 className="text-3xl sm:text-4xl font-display text-surface">
            Test la maia for 12 hours on our dime.
          </h2>

          <p className="text-sm sm:text-base font-sans text-surface/80 max-w-xl mx-auto leading-relaxed font-light">
            Try the complimentary 2ml sample vial tomorrow morning before heading into the heat. If it doesn&rsquo;t stay
            radiant and project through your entire day, return the sealed 100ml box for an instant, no-questions-asked refund.
          </p>

          <div className="flex items-center justify-center gap-3 text-sm font-sans">
            <span className="text-2xl font-display text-surface font-semibold">₹1,399</span>
            <span className="text-xs text-surface/60 line-through">MRP ₹1,899</span>
            <span className="text-xs bg-emerald-900/60 border border-emerald-700/60 text-emerald-400 px-2 py-0.5 rounded">
              Save ₹500 with LASTING20
            </span>
          </div>

          <div className="pt-2">
            <a href="#order-form">
              <Button size="lg" variant="primary" className="shadow-lg px-8">
                Claim 20% OFF + Free 2ml Test Vial
              </Button>
            </a>
          </div>

          <div className="text-[11px] font-sans text-surface/60 pt-2">
            ⚡ High demand: Only 14 Discovery sets reserved for Google Ads search visitors today.
          </div>
        </div>
      </section>

      {/* 15. Legal Metrology, Dangerous Goods & Batch FEFO Transparency */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-raised">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-surface border-line p-8 space-y-6">
            <div className="border-b border-line pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-xs uppercase tracking-widest text-accent font-sans font-semibold">
                  Compliance &amp; Declarations
                </span>
                <h3 className="text-xl font-display text-ink mt-0.5">
                  Legal Metrology &amp; Transport Classification
                </h3>
              </div>
              <Badge variant="surface-only">Class 3 Flammable &bull; Surface Express Only</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-sans text-ink-secondary">
              <div className="space-y-1">
                <span className="font-semibold text-ink uppercase tracking-wider block">Net Quantity &amp; MRP</span>
                <p>Net Vol: 100ml (Plus 2ml Wear-Test Sample)</p>
                <p>MRP: ₹1,899 (Inclusive of all taxes)</p>
                <p>Selling Price: ₹1,399</p>
                <p>HSN Code: 33030090</p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-ink uppercase tracking-wider block">Cosmetic Formulation</span>
                <p>Concentration: 28% Extrait de Parfum</p>
                <p>IFRA Standards: Compliant (51st Amendment)</p>
                <p>Cruelty-Free &bull; 100% Skin Safe</p>
                <p>Allergen Declarations: On Product Carton</p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-ink uppercase tracking-wider block">Dangerous Goods Transit</span>
                <p>Classification: FLAMMABLE_SURFACE_ONLY</p>
                <p>UN Number: UN 1266 (Perfumery Products)</p>
                <p>Courier: Ground Surface Express (BlueDart / Delhivery)</p>
                <p>Air Shipping: Prohibited under DG regulations</p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-ink uppercase tracking-wider block">Batch &amp; Manufacturer</span>
                <p>Maceration: 45-day cold vault cured</p>
                <p>Allocation: Strict FEFO (First-Expiry-First-Out)</p>
                <p>Manufactured by: La Maia Fragrances Pvt. Ltd.</p>
                <p>Country of Origin: India</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 16. Sticky Mobile Order Bar */}
      <aside
        className={`fixed bottom-0 left-0 w-full bg-[#181512]/95 backdrop-blur-md border-t border-[#3E3731] p-3 z-40 transition-transform duration-300 md:hidden flex items-center justify-between ${
          stickyBarVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-label="Quick Mobile Order"
      >
        <div className="flex items-center gap-3">
          <img
            src={selectedVariant.image}
            alt={selectedVariant.name}
            className="w-10 h-10 rounded object-cover border border-accent/40"
          />
          <div>
            <div className="text-xs font-display text-surface font-semibold">{selectedVariant.name}</div>
            <div className="text-xs font-sans text-accent font-bold">
              ₹1,399 <span className="line-through text-[10px] text-surface/50 font-normal">₹1,899</span>
            </div>
          </div>
        </div>

        <a href="#order-form">
          <Button size="sm" variant="primary">
            Order Now (20% Off)
          </Button>
        </a>
      </aside>

      {/* 17. Recent Buyer Social Proof Toast */}
      {showBuyerToast && (
        <aside
          className="fixed bottom-6 left-6 z-40 bg-[#181512]/95 text-surface border border-[#3E3731] rounded-lg p-3 max-w-xs shadow-2xl flex items-center gap-3 animate-fade-in"
          aria-live="polite"
        >
          <div className="w-10 h-10 rounded bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-sm flex-shrink-0">
            📦
          </div>
          <div className="text-xs font-sans">
            <p className="text-surface font-medium">
              <strong>{currentBuyer.name}</strong> from {currentBuyer.city}
            </p>
            <p className="text-surface/70">
              Reserved <strong>{currentBuyer.item}</strong>
            </p>
            <span className="text-[10px] text-accent font-semibold">{currentBuyer.time} &bull; Verified Order</span>
          </div>
        </aside>
      )}

      {/* 18. Floating WhatsApp & Concierge Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
        <a
          href="https://wa.me/919876543210?text=Hi%20la%20maia%20Atelier,%20I'm%20inquiring%20about%20the%2012-Hour%20Extrait%20de%20Parfum%20offer%20(Code:%20LASTING20)"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-transform hover:scale-105"
          title="Chat with Fragrance Specialist on WhatsApp"
          aria-label="WhatsApp Contact"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.07c-.24.68-1.4 1.34-1.95 1.41-.53.07-1.2.1-1.94-.14-.46-.15-1.06-.35-1.83-.69-3.23-1.43-5.34-4.71-5.5-4.93-.16-.22-1.32-1.75-1.32-3.34 0-1.59.83-2.37 1.13-2.69.3-.32.65-.4 0.87-.4.22 0 .43 0 .62.01.2.01.47-.08.73.55.27.65.92 2.25 1 2.42.08.17.14.37.03.6-.11.23-.17.37-.34.57-.17.2-.36.45-.51.6-.17.17-.35.36-.15.7.2.34.89 1.47 1.91 2.38 1.31 1.17 2.42 1.53 2.76 1.7.34.17.54.14.74-.09.2-.23.86-1 1.09-1.34.23-.34.46-.28.77-.17.31.11 1.99.94 2.33 1.11.34.17.57.26.65.4.08.14.08.83-.16 1.51z" />
          </svg>
        </a>

        <a
          href="tel:+919876543210"
          className="w-12 h-12 rounded-full bg-[#211D1A] text-accent border border-accent/40 flex items-center justify-center shadow-lg hover:bg-black transition-transform hover:scale-105"
          title="Call Fragrance Concierge"
          aria-label="Phone Concierge"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
      </div>

      {/* 19. Exit Intent Modal */}
      {isExitOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181512] border-2 border-accent text-surface rounded-lg p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsExitOpen(false)}
              className="absolute top-3 right-3 text-surface/60 hover:text-surface text-xl"
            >
              &times;
            </button>
            <div className="text-3xl">⏳</div>
            <h3 className="text-2xl font-display text-accent">Wait! Before you leave empty-handed</h3>
            <p className="text-xs sm:text-sm font-sans text-surface/80 leading-relaxed font-light">
              Don&rsquo;t spend another hot summer day with perfume that disappears in two hours. Lock in your
              Google Ads VIP reservation now and receive an extra saving on your 100ml Extrait.
            </p>
            <div className="bg-accent/15 border border-dashed border-accent p-3 rounded">
              <span className="text-xs text-surface/80 font-sans block">Exclusive VIP Code:</span>
              <strong className="text-accent font-mono text-base">LASTING20</strong>
            </div>
            <div className="pt-2">
              <a href="#order-form" onClick={() => setIsExitOpen(false)}>
                <Button variant="primary" className="w-full">
                  Claim Deal &bull; ₹1,399
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 20. Strategy & Ads Blueprint Modal */}
      {isStrategyOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
          <div className="bg-[#181512] border-2 border-accent text-surface rounded-xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsStrategyOpen(false)}
              className="absolute top-4 right-4 text-surface/60 hover:text-surface text-2xl font-light"
            >
              &times;
            </button>

            <div>
              <span className="text-xs uppercase tracking-widest text-accent font-sans font-semibold">
                CRO &amp; Google Ads Quality Score Hub
              </span>
              <h3 className="text-2xl font-display text-surface mt-1">15-Point Conversion Architecture</h3>
              <p className="text-xs font-sans text-surface/70 mt-1">
                Ad Group 4: Long-Lasting Perfume &bull; High Search Intent Alignment &bull; GTM DataLayer
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#3E3731] gap-2 overflow-x-auto text-xs font-sans pb-2">
              <button
                type="button"
                onClick={() => setStrategyTab('ads')}
                className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                  strategyTab === 'ads' ? 'bg-accent text-[#1B1916] font-bold' : 'text-surface/70 hover:text-surface'
                }`}
              >
                1. Ads &amp; Quality Score
              </button>
              <button
                type="button"
                onClick={() => setStrategyTab('audience')}
                className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                  strategyTab === 'audience' ? 'bg-accent text-[#1B1916] font-bold' : 'text-surface/70 hover:text-surface'
                }`}
              >
                2. Audience &amp; Copy
              </button>
              <button
                type="button"
                onClick={() => setStrategyTab('science')}
                className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                  strategyTab === 'science' ? 'bg-accent text-[#1B1916] font-bold' : 'text-surface/70 hover:text-surface'
                }`}
              >
                3. Science &amp; Pyramid
              </button>
              <button
                type="button"
                onClick={() => setStrategyTab('offer')}
                className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                  strategyTab === 'offer' ? 'bg-accent text-[#1B1916] font-bold' : 'text-surface/70 hover:text-surface'
                }`}
              >
                4. Offer &amp; Trust
              </button>
              <button
                type="button"
                onClick={() => setStrategyTab('gtm')}
                className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                  strategyTab === 'gtm' ? 'bg-accent text-[#1B1916] font-bold' : 'text-surface/70 hover:text-surface'
                }`}
              >
                5. GTM &amp; Tracking
              </button>
            </div>

            {/* Tab Panels */}
            <div className="text-xs font-sans text-surface/80 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {strategyTab === 'ads' && (
                <div className="space-y-4">
                  <div className="bg-[#211D1A] p-4 rounded border border-[#3E3731] space-y-2">
                    <h4 className="text-accent font-semibold text-sm">Targeting &amp; Keyword Alignment</h4>
                    <p>&bull; <strong>Campaign Ad Group:</strong> Ad Group 4 &mdash; Long Lasting Perfume</p>
                    <p>&bull; <strong>Primary Keywords:</strong> long lasting perfume, best long lasting perfume in India, 12 hour lasting perfume, sweat proof perfume.</p>
                    <p>&bull; <strong>Quality Score 10/10 Matrix:</strong> 100% congruent keyword matching between ad headline (&ldquo;Long Lasting Perfume India&rdquo;) and landing page H1.</p>
                  </div>
                  <div className="bg-[#211D1A] p-4 rounded border border-[#3E3731] space-y-2">
                    <h4 className="text-accent font-semibold text-sm">Responsive Search Ad Assets (RSAs)</h4>
                    <p>&bull; <strong>Headlines:</strong> 1. Long Lasting Perfume India | 2. 12+ Hour Verified Longevity | 3. Built For Indian Summer Heat | 4. 28% Extrait vs 8% Ordinary EDT | 5. Flat 20% Off Code: LASTING20</p>
                    <p>&bull; <strong>Descriptions:</strong> Tired of perfumes fading in 2 hours? la maia Climate-Lock™ fixatives deliver verified 12-hour projection in 40°C heat. Test the complimentary 2ml sample vial first.</p>
                  </div>
                </div>
              )}

              {strategyTab === 'audience' && (
                <div className="space-y-4">
                  <div className="bg-[#211D1A] p-4 rounded border border-[#3E3731] space-y-2">
                    <h4 className="text-accent font-semibold text-sm">Target Personas</h4>
                    <p>&bull; <strong>The Daily Commuter (24-38):</strong> Navigates metro and two-wheeler traffic in Delhi, Mumbai, Bengaluru, Hyderabad. Needs a fragrance that resists sweat.</p>
                    <p>&bull; <strong>Corporate Executives (28-48):</strong> Demands sophisticated, non-headache-inducing sillage for back-to-back presentations without constant re-spraying.</p>
                    <p>&bull; <strong>Socialites &amp; Weddings (22-45):</strong> Demands deep projection that cuts through banquet hall food aromas and 8-12 hour celebrations.</p>
                  </div>
                </div>
              )}

              {strategyTab === 'science' && (
                <div className="space-y-4">
                  <div className="bg-[#211D1A] p-4 rounded border border-[#3E3731] space-y-2">
                    <h4 className="text-accent font-semibold text-sm">Fixative Chemistry &amp; Maceration</h4>
                    <p>&bull; <strong>28% Pure Extrait:</strong> 3X higher oil concentration than typical market EDT.</p>
                    <p>&bull; <strong>Ambroxan &amp; Iso E Super:</strong> High-molecular-weight anchors that form a breathable lipid shield on skin.</p>
                    <p>&bull; <strong>45-Day Curing:</strong> Vault maceration facilitates natural esterification, eliminating alcohol harshness.</p>
                  </div>
                </div>
              )}

              {strategyTab === 'offer' && (
                <div className="space-y-4">
                  <div className="bg-[#211D1A] p-4 rounded border border-[#3E3731] space-y-2">
                    <h4 className="text-accent font-semibold text-sm">Irresistible Offer Stack</h4>
                    <p>&bull; Standard MRP: ₹1,899 (100ml Extrait de Parfum)</p>
                    <p>&bull; Special Ad Price: ₹1,399 (Save ₹500 via Code LASTING20)</p>
                    <p>&bull; Free Gift 1: 2ml 12-Hour Wear-Test Sample (Worth ₹299)</p>
                    <p>&bull; Free Gift 2: Brass Refillable Travel Atomizer (Worth ₹499)</p>
                    <p>&bull; Free Gift 3: Insured Surface Express Transit (Worth ₹150)</p>
                    <p>&bull; Total Perceived Bundle Value: ₹2,847 for only ₹1,399 (51% effective savings)</p>
                  </div>
                </div>
              )}

              {strategyTab === 'gtm' && (
                <div className="space-y-4">
                  <div className="bg-[#211D1A] p-4 rounded border border-[#3E3731] space-y-2">
                    <h4 className="text-accent font-semibold text-sm">GTM DataLayer Specification</h4>
                    <pre className="bg-black/60 p-3 rounded font-mono text-[11px] text-emerald-400 overflow-x-auto">
{`// Event 1: Lead Form Reservation
window.dataLayer.push({
  event: 'lead_form_submit',
  lead_type: 'perfume_checkout_reservation',
  product_variant: '${selectedVariant.name}',
  promo_code: 'LASTING20',
  value: 1399,
  currency: 'INR'
});

// Event 2: Purchase Confirmation
gtag('event', 'conversion', {
  'send_to': 'AW-10987654321/PurchaseConversion',
  'value': 1399.00,
  'currency': 'INR'
});`}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            <div className="text-right pt-2 border-t border-[#3E3731]">
              <Button size="sm" variant="secondary" onClick={() => setIsStrategyOpen(false)}>
                Close Blueprint
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
