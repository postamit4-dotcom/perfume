'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Wordmark } from './Wordmark';
import { ScentFamily } from '../tokens/colors';

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  navLinks?: NavLink[];
  currentPath?: string;
  onCartClick?: () => void;
  cartCount?: number;
  wishlistCount?: number;
}

interface ScentItem {
  name: string;
  href: string;
  tag?: string;
  notes?: string;
  isNew?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath = '',
  onCartClick,
  cartCount = 0,
  wishlistCount = 0,
}) => {
  // Navigation states
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileAccordions, setMobileAccordions] = useState<Record<string, boolean>>({
    deals: true,
    perfumes: false,
    bestsellers: false,
    discovery: false,
    gifting: false,
  });

  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keyboard shortcut Ctrl+K / Cmd+K for search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setActiveMegaMenu(null);
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile drawer or search modal is open
  useEffect(() => {
    if (mobileDrawerOpen || searchModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileDrawerOpen, searchModalOpen]);

  const handleMouseEnter = (menuKey: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMegaMenu(menuKey);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  const toggleMobileAccordion = (key: string) => {
    setMobileAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Quick search suggestions
  const quickSearchQueries = [
    'Chrono Woods',
    'Eternal Amber',
    'Infinity Bloom',
    '24-Hour Oud',
    'Discovery Set',
    '12-Hour Wear',
    'Woody',
    'Jasmine',
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all bg-surface/95 backdrop-blur-md border-b border-line/70">
      {/* =========================================================
          1. TOP ANNOUNCEMENT TICKER (Bella Vita Organic Style)
         ========================================================= */}
      <aside
        className="bg-[#211D1A] text-surface border-b border-[#3E3731] py-1.5 px-4 text-[11px] sm:text-xs font-sans text-center transition-colors shadow-sm"
        aria-label="Promotions and Announcements"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-2 text-surface/75 text-[11px]">
            <span>🌿 100% IFRA Compliant</span>
            <span>&bull;</span>
            <span>28% Extrait de Parfum</span>
          </div>

          <div className="flex-1 text-center font-medium flex items-center justify-center gap-2 flex-wrap">
            <span className="text-accent font-semibold tracking-wide">
              ⚡ CRAZY ATELIER DEAL:
            </span>
            <span>
              Flat <strong className="text-surface font-semibold underline decoration-accent underline-offset-4">20% OFF</strong> with Code <strong className="text-accent font-mono">LASTING20</strong> + Free 2ml 12H Wear-Test Sample &amp; Pocket Atomizer!
            </span>
            <span className="bg-accent/20 border border-accent/40 text-accent px-2 py-0.2 rounded text-[10px] hidden sm:inline-block">
              Free Pan-India Surface Delivery
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-surface/80 text-[11px]">
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1">
              <span>💬</span> WhatsApp Concierge
            </a>
            <span>&bull;</span>
            <a href="/care" className="hover:text-accent transition-colors">
              Track Order
            </a>
          </div>
        </div>
      </aside>

      {/* =========================================================
          2. MAIN HEADER BAR
         ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Trigger + Brand Logo */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-md text-ink hover:text-accent hover:bg-line/20 transition-colors"
            aria-label="Open Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Wordmark Logo */}
          <a href="/" className="inline-flex flex-col group py-1" aria-label="la maia homepage">
            <Wordmark size="lg" />
            <span className="text-[9px] uppercase tracking-[0.28em] font-sans text-accent font-medium -mt-1 group-hover:text-accent-hover transition-colors">
              Atelier de Parfum &bull; India
            </span>
          </a>
        </div>

        {/* Center: Desktop Navigation Bar with Mega Menus */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-xs font-sans font-medium uppercase tracking-[0.14em]" aria-label="Main Navigation">
          {/* 1. CRAZY DEALS (Bella Vita Highlighted Promo Tab) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('deals')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="/#order-form"
              className="px-3 py-2 rounded-sm text-accent font-bold hover:text-accent-hover hover:bg-accent/10 transition-colors flex items-center gap-1.5"
            >
              <span className="text-sm">🔥</span>
              <span>Crazy Deals</span>
              <span className="bg-accent text-surface text-[9px] font-bold px-1.5 py-0.5 rounded-sm tracking-wider font-mono">
                20% OFF
              </span>
            </a>
          </div>

          {/* 2. BESTSELLERS */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('bestsellers')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="/#variants"
              className="px-3 py-2 rounded-sm text-ink/90 hover:text-accent transition-colors flex items-center gap-1"
            >
              <span>Bestsellers</span>
              <svg className={`w-3 h-3 transition-transform ${activeMegaMenu === 'bestsellers' ? 'rotate-180 text-accent' : 'text-ink-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* 3. PERFUMES / EXTRAITS (Mega Menu) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('perfumes')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="/fragrances"
              className="px-3 py-2 rounded-sm text-ink/90 hover:text-accent transition-colors flex items-center gap-1"
            >
              <span>Perfumes</span>
              <svg className={`w-3 h-3 transition-transform ${activeMegaMenu === 'perfumes' ? 'rotate-180 text-accent' : 'text-ink-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* 4. DISCOVERY SETS (Voucher Program) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('discovery')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="/discovery-sets"
              className="px-3 py-2 rounded-sm text-ink/90 hover:text-accent transition-colors flex items-center gap-1"
            >
              <span>Discovery Sets</span>
              <span className="bg-emerald-900/10 text-emerald-900 border border-emerald-800/30 text-[9px] px-1.5 py-0.2 rounded font-semibold lowercase">
                100% credit
              </span>
            </a>
          </div>

          {/* 5. LUXURY GIFTING */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('gifting')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="/gifting"
              className="px-3 py-2 rounded-sm text-ink/90 hover:text-accent transition-colors flex items-center gap-1"
            >
              <span>Gifting &amp; Combos</span>
              <svg className={`w-3 h-3 transition-transform ${activeMegaMenu === 'gifting' ? 'rotate-180 text-accent' : 'text-ink-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* 6. FRAGRANCE FINDER */}
          <div>
            <a
              href="/finder"
              className="px-3 py-2 rounded-sm text-ink/90 hover:text-accent transition-colors flex items-center gap-1"
            >
              <span>Scent Quiz</span>
            </a>
          </div>

          {/* 7. OUR STORY & JOURNAL */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('story')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href="/story"
              className="px-3 py-2 rounded-sm text-ink/90 hover:text-accent transition-colors flex items-center gap-1"
            >
              <span>About Us</span>
              <svg className={`w-3 h-3 transition-transform ${activeMegaMenu === 'story' ? 'rotate-180 text-accent' : 'text-ink-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </nav>

        {/* Right: Search, Wishlist, Account, Bag */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="p-2 text-ink hover:text-accent hover:bg-line/20 rounded-full transition-colors flex items-center gap-2"
            title="Search perfumes (Ctrl+K)"
            aria-label="Search Fragrances"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden xl:inline-block text-[11px] font-sans font-medium text-ink-secondary border border-line rounded px-1.5 py-0.5">
              ⌘K
            </span>
          </button>

          {/* Wishlist Link */}
          <a
            href="/account"
            className="p-2 text-ink hover:text-accent hover:bg-line/20 rounded-full transition-colors relative hidden sm:flex items-center justify-center"
            title="Wishlist"
            aria-label="Saved Fragrances"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-surface text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </a>

          {/* Account Profile */}
          <a
            href="/account"
            className="p-2 text-ink hover:text-accent hover:bg-line/20 rounded-full transition-colors hidden sm:flex items-center justify-center"
            title="Account & Orders"
            aria-label="Customer Account"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </a>

          {/* Shopping Bag / Cart */}
          <button
            type="button"
            onClick={onCartClick || (() => (window.location.href = '/cart'))}
            className="relative px-3.5 py-2 rounded bg-surface-dark text-surface hover:bg-black transition-all flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-wider shadow-sm group"
            aria-label={`Shopping Bag (${cartCount} items)`}
          >
            <svg className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Bag</span>
            <span className="w-5 h-5 rounded-full bg-accent text-surface text-[10px] font-bold flex items-center justify-center font-mono">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* =========================================================
          3. DESKTOP MEGA-MENU PANELS (Bella Vita Multi-Column)
         ========================================================= */}

      {/* MEGA MENU: CRAZY DEALS */}
      {activeMegaMenu === 'deals' && (
        <div
          className="hidden lg:block absolute left-0 w-full bg-surface-raised border-b border-line shadow-2xl z-50 animate-fade-in"
          onMouseEnter={() => handleMouseEnter('deals')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8">
            <div className="col-span-8 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-line">
                <span className="text-sm">🔥</span>
                <h3 className="font-display text-xl text-ink font-semibold">Active Atelier Offers &amp; Bundles</h3>
                <span className="text-[10px] uppercase font-sans tracking-widest text-accent bg-accent/15 px-2 py-0.5 rounded">
                  Limited Time
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <a href="/#order-form" className="p-3.5 rounded bg-surface border border-line hover:border-accent transition-all space-y-1 block group">
                  <div className="flex justify-between items-center">
                    <strong className="text-ink font-semibold group-hover:text-accent">Google Ads Exclusive (20% OFF)</strong>
                    <span className="font-mono text-accent font-bold">LASTING20</span>
                  </div>
                  <p className="text-ink-secondary text-[11px] leading-relaxed">
                    Reserve your 100ml Extrait for ₹1,399 (MRP ₹1,899). Includes free 2ml sample vial &amp; pocket atomizer.
                  </p>
                </a>

                <a href="/discovery-sets" className="p-3.5 rounded bg-surface border border-line hover:border-accent transition-all space-y-1 block group">
                  <div className="flex justify-between items-center">
                    <strong className="text-ink font-semibold group-hover:text-accent">100% Full-Size Bottle Credit</strong>
                    <span className="bg-emerald-900/10 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded font-semibold">ZERO RISK</span>
                  </div>
                  <p className="text-ink-secondary text-[11px] leading-relaxed">
                    Order the 5-Piece Discovery Set for ₹999. Get the entire ₹999 credited toward your full-size bottle.
                  </p>
                </a>

                <a href="/gifting" className="p-3.5 rounded bg-surface border border-line hover:border-accent transition-all space-y-1 block group">
                  <div className="flex justify-between items-center">
                    <strong className="text-ink font-semibold group-hover:text-accent">His &amp; Hers Layering Duo</strong>
                    <span className="text-accent font-semibold">SAVE ₹1,200</span>
                  </div>
                  <p className="text-ink-secondary text-[11px] leading-relaxed">
                    Chrono Woods + Infinity Bloom twin collector box in rigid gold-foil packaging.
                  </p>
                </a>

                <a href="/#how-it-works" className="p-3.5 rounded bg-surface border border-line hover:border-accent transition-all space-y-1 block group">
                  <div className="flex justify-between items-center">
                    <strong className="text-ink font-semibold group-hover:text-accent">7-Day 12-Hour Wear Guarantee</strong>
                    <span className="text-emerald-800 text-[10px] font-bold">100% REFUND</span>
                  </div>
                  <p className="text-ink-secondary text-[11px] leading-relaxed">
                    Wear the 2ml vial for 12 hours. If it does not command compliments, return the sealed 100ml bottle.
                  </p>
                </a>
              </div>
            </div>

            {/* Promo Card Right */}
            <div className="col-span-4 bg-[#211D1A] text-surface p-6 rounded border border-[#3E3731] space-y-3 text-center flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-sans tracking-widest text-accent font-semibold">
                  Today&rsquo;s Featured Deal
                </span>
                <h4 className="font-display text-2xl text-surface">Chrono Woods 28% Extrait</h4>
                <p className="text-xs font-sans text-surface/70 leading-relaxed font-light">
                  Aged Atlas Cedar, Iso E Super &amp; Bergamot. Verified 12+ hour wear in 40°C Indian heat.
                </p>
                <div className="text-xl font-display text-accent font-semibold pt-1">
                  ₹1,399 <span className="line-through text-xs text-surface/50 font-normal">₹1,899</span>
                </div>
              </div>

              <a href="/#order-form" className="w-full py-2.5 rounded bg-accent text-surface hover:bg-accent-hover text-xs uppercase font-sans tracking-wider font-semibold block transition-colors">
                Claim 20% Discount
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MEGA MENU: BESTSELLERS */}
      {activeMegaMenu === 'bestsellers' && (
        <div
          className="hidden lg:block absolute left-0 w-full bg-surface-raised border-b border-line shadow-2xl z-50 animate-fade-in"
          onMouseEnter={() => handleMouseEnter('bestsellers')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8">
            <div className="col-span-8 space-y-4">
              <h3 className="font-display text-xl text-ink font-semibold pb-2 border-b border-line">
                India&rsquo;s Most Loved Long-Lasting Extraits
              </h3>

              <div className="grid grid-cols-2 gap-6 text-xs font-sans">
                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-wider text-accent font-semibold block">
                    Top 4 Signature Extraits (100ml)
                  </span>
                  <ul className="space-y-2.5">
                    <li>
                      <a href="/#variants" className="flex items-center justify-between text-ink hover:text-accent group">
                        <span className="group-hover:translate-x-1 transition-transform">
                          <strong>Chrono Woods</strong> &bull; Iso E Super, Cedar &amp; Bergamot
                        </span>
                        <span className="text-accent text-[11px] font-semibold">12H Wear</span>
                      </a>
                    </li>
                    <li>
                      <a href="/#variants" className="flex items-center justify-between text-ink hover:text-accent group">
                        <span className="group-hover:translate-x-1 transition-transform">
                          <strong>Eternal Amber</strong> &bull; Golden Resins &amp; Vanilla
                        </span>
                        <span className="text-amber-800 text-[11px] font-semibold">Warm Sillage</span>
                      </a>
                    </li>
                    <li>
                      <a href="/#variants" className="flex items-center justify-between text-ink hover:text-accent group">
                        <span className="group-hover:translate-x-1 transition-transform">
                          <strong>Infinity Bloom</strong> &bull; Sambac Jasmine &amp; Rose
                        </span>
                        <span className="text-pink-800 text-[11px] font-semibold">Floral Aura</span>
                      </a>
                    </li>
                    <li>
                      <a href="/#variants" className="flex items-center justify-between text-ink hover:text-accent group">
                        <span className="group-hover:translate-x-1 transition-transform">
                          <strong>24-Hour Oud</strong> &bull; Assam Agarwood &amp; Saffron
                        </span>
                        <span className="text-purple-900 text-[11px] font-semibold">Royal Oud</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-wider text-accent font-semibold block">
                    Discovery &amp; Travel Best Sellers
                  </span>
                  <ul className="space-y-2.5">
                    <li>
                      <a href="/discovery-sets" className="flex items-center justify-between text-ink hover:text-accent group">
                        <span className="group-hover:translate-x-1 transition-transform">
                          <strong>5-Piece Discovery Set</strong> &bull; 5 x 2ml Vials
                        </span>
                        <span className="text-emerald-800 text-[10px] font-bold">₹999 (100% Credit)</span>
                      </a>
                    </li>
                    <li>
                      <a href="/#order-form" className="flex items-center justify-between text-ink hover:text-accent group">
                        <span className="group-hover:translate-x-1 transition-transform">
                          <strong>Brass Pocket Travel Atomizer</strong> (10ml)
                        </span>
                        <span className="text-ink-secondary text-[10px]">Free with 100ml</span>
                      </a>
                    </li>
                    <li>
                      <a href="/gifting" className="flex items-center justify-between text-ink hover:text-accent group">
                        <span className="group-hover:translate-x-1 transition-transform">
                          <strong>The Grand Atelier Gift Box</strong>
                        </span>
                        <span className="text-accent text-[10px]">Gold Debossed</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-span-4 bg-surface p-6 rounded border border-line space-y-3 text-center">
              <span className="text-[10px] uppercase font-sans tracking-widest text-accent font-semibold">
                Verified Social Proof
              </span>
              <div className="text-3xl font-display text-accent font-semibold">4.92 / 5.0</div>
              <p className="text-xs font-sans text-ink-secondary leading-relaxed font-light">
                Over <strong>18,400+ bottles</strong> delivered across 320 Indian cities with an ultra-low return rate of 0.8%.
              </p>
              <div className="pt-2">
                <a href="/#reviews" className="text-xs uppercase font-sans tracking-wider text-ink font-semibold hover:text-accent underline">
                  Read Commuter Reviews &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MEGA MENU: PERFUMES (Bella Vita 4-Column Layout) */}
      {activeMegaMenu === 'perfumes' && (
        <div
          className="hidden lg:block absolute left-0 w-full bg-surface-raised border-b border-line shadow-2xl z-50 animate-fade-in"
          onMouseEnter={() => handleMouseEnter('perfumes')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8">
            {/* Column 1: By Gender & Occasion */}
            <div className="col-span-3 space-y-3 text-xs font-sans">
              <span className="text-[11px] uppercase tracking-wider text-accent font-semibold block border-b border-line pb-1.5">
                By Character &amp; Gender
              </span>
              <ul className="space-y-2 text-ink">
                <li><a href="/mens-perfume" className="hover:text-accent transition-colors block font-medium">Men&rsquo;s Perfumes (From ₹499)</a></li>
                <li><a href="/fragrances?audience=women" className="hover:text-accent transition-colors block">Women&rsquo;s Perfumes (Floral Sillage)</a></li>
                <li><a href="/fragrances?audience=unisex" className="hover:text-accent transition-colors block">Unisex &amp; Layering Resins</a></li>
                <li><a href="/fragrances?occasion=office" className="hover:text-accent transition-colors block">Daily Commuter &amp; Office Wear</a></li>
                <li><a href="/fragrances?occasion=evening" className="hover:text-accent transition-colors block">Evening &amp; Gala Statements</a></li>
                <li><a href="/fragrances?occasion=summer" className="hover:text-accent transition-colors block">Monsoon &amp; 40°C Heat Resilient</a></li>
              </ul>
            </div>

            {/* Column 2: 7 Scent Families */}
            <div className="col-span-3 space-y-3 text-xs font-sans">
              <span className="text-[11px] uppercase tracking-wider text-accent font-semibold block border-b border-line pb-1.5">
                Seven Olfactive Families
              </span>
              <ul className="space-y-2 text-ink">
                <li><a href="/families/woody" className="hover:text-accent flex items-center justify-between"><span>Woody (Cedar &amp; Sandalwood)</span> <span className="w-2 h-2 rounded-full bg-[#8A6A4F]" /></a></li>
                <li><a href="/families/amber" className="hover:text-accent flex items-center justify-between"><span>Amber (Golden Resins &amp; Tonka)</span> <span className="w-2 h-2 rounded-full bg-[#B5763A]" /></a></li>
                <li><a href="/families/floral" className="hover:text-accent flex items-center justify-between"><span>Floral (Night Sambac Jasmine)</span> <span className="w-2 h-2 rounded-full bg-[#C98B8B]" /></a></li>
                <li><a href="/families/fresh" className="hover:text-accent flex items-center justify-between"><span>Fresh Aquatic (Ozone &amp; Sea Mist)</span> <span className="w-2 h-2 rounded-full bg-[#6F9A94]" /></a></li>
                <li><a href="/families/citrus" className="hover:text-accent flex items-center justify-between"><span>Citrus (Calabrian Bergamot)</span> <span className="w-2 h-2 rounded-full bg-[#C9A43B]" /></a></li>
                <li><a href="/families/gourmand" className="hover:text-accent flex items-center justify-between"><span>Gourmand (Cardamom &amp; Cocoa)</span> <span className="w-2 h-2 rounded-full bg-[#8E5B4A]" /></a></li>
                <li><a href="/families/earthy" className="hover:text-accent flex items-center justify-between"><span>Earthy (Mitti Attar &amp; Terracotta)</span> <span className="w-2 h-2 rounded-full bg-[#7A6B55]" /></a></li>
              </ul>
            </div>

            {/* Column 3: Format & Concentration */}
            <div className="col-span-3 space-y-3 text-xs font-sans">
              <span className="text-[11px] uppercase tracking-wider text-accent font-semibold block border-b border-line pb-1.5">
                Format &amp; Concentration
              </span>
              <ul className="space-y-2 text-ink">
                <li><a href="/#variants" className="hover:text-accent font-medium block">28% Extrait de Parfum (100ml)</a></li>
                <li><a href="/#order-form" className="hover:text-accent block">Pocket Travel Atomizers (10ml)</a></li>
                <li><a href="/discovery-sets" className="hover:text-accent block">Discovery Sample Vials (2ml)</a></li>
                <li><a href="/#concentration-chart" className="hover:text-accent block">Concentration &amp; Sillage Spectrum</a></li>
                <li><a href="/compliance" className="hover:text-accent block">Legal Metrology &amp; IFRA Standards</a></li>
              </ul>
            </div>

            {/* Column 4: Visual Scent Card */}
            <div className="col-span-3 bg-surface p-5 rounded border border-line space-y-3 text-center flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[9px] uppercase font-sans tracking-widest text-accent font-semibold">
                  Flagship Creation
                </span>
                <h4 className="font-display text-lg text-ink font-semibold">Chrono Woods</h4>
                <p className="text-[11px] text-ink-secondary leading-relaxed">
                  28% Extrait with heavy-chain Iso E Super &amp; 45-day cold vault cedar.
                </p>
                <div className="text-sm font-display text-accent font-bold pt-1">
                  ₹1,399 <span className="text-[10px] text-ink-secondary line-through">₹1,899</span>
                </div>
              </div>
              <a href="/#variants" className="py-2 px-3 rounded bg-surface-dark text-surface hover:bg-black text-[11px] uppercase tracking-wider font-sans font-semibold transition-colors block">
                Explore Scents
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MEGA MENU: LUXURY GIFTING */}
      {activeMegaMenu === 'gifting' && (
        <div
          className="hidden lg:block absolute left-0 w-full bg-surface-raised border-b border-line shadow-2xl z-50 animate-fade-in"
          onMouseEnter={() => handleMouseEnter('gifting')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8">
            <div className="col-span-8 space-y-4">
              <h3 className="font-display text-xl text-ink font-semibold pb-2 border-b border-line">
                Curated Gifting &amp; Luxury Twin Sets
              </h3>

              <div className="grid grid-cols-3 gap-6 text-xs font-sans">
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-accent font-semibold block">
                    Curated Gift Sets
                  </span>
                  <ul className="space-y-2">
                    <li><a href="/gifting" className="hover:text-accent block">The Grand Atelier Box</a></li>
                    <li><a href="/gifting" className="hover:text-accent block">His &amp; Hers Couple Duo</a></li>
                    <li><a href="/gifting" className="hover:text-accent block">Festive Scent Wardrobe</a></li>
                    <li><a href="/discovery-sets" className="hover:text-accent block">The 5-Scent Discovery Set</a></li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-accent font-semibold block">
                    By Celebration
                  </span>
                  <ul className="space-y-2">
                    <li><a href="/gifting?occasion=wedding" className="hover:text-accent block">Weddings &amp; Anniversaries</a></li>
                    <li><a href="/gifting?occasion=birthday" className="hover:text-accent block">Milestone Birthdays</a></li>
                    <li><a href="/gifting?occasion=corporate" className="hover:text-accent block">Executive &amp; Corporate</a></li>
                    <li><a href="/gifting?occasion=festive" className="hover:text-accent block">Diwali &amp; Festive Favors</a></li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-accent font-semibold block">
                    Atelier Services
                  </span>
                  <ul className="space-y-2">
                    <li><span className="text-ink-secondary block">&bull; Hand-calligraphed message cards</span></li>
                    <li><span className="text-ink-secondary block">&bull; Rigid gold-foil debossed boxes</span></li>
                    <li><span className="text-ink-secondary block">&bull; Tamper-evident wax seals</span></li>
                    <li><span className="text-ink-secondary block">&bull; Temperature-secure surface transit</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-span-4 bg-[#211D1A] text-surface p-6 rounded border border-[#3E3731] space-y-3 text-center flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-sans tracking-widest text-accent font-semibold">
                  Personalized Atelier Experience
                </span>
                <h4 className="font-display text-xl text-surface">Bespoke Gift Concierge</h4>
                <p className="text-xs font-sans text-surface/70 leading-relaxed font-light">
                  Need custom gift curations, brass engraved flacons, or corporate bulk orders?
                </p>
              </div>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="py-2.5 px-4 rounded bg-accent text-surface hover:bg-accent-hover text-xs uppercase font-sans tracking-wider font-semibold block transition-colors">
                Chat with Gift Concierge
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MEGA MENU: ABOUT & STORY */}
      {activeMegaMenu === 'story' && (
        <div
          className="hidden lg:block absolute left-0 w-full bg-surface-raised border-b border-line shadow-2xl z-50 animate-fade-in"
          onMouseEnter={() => handleMouseEnter('story')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8 text-xs font-sans">
            <div className="col-span-4 space-y-2">
              <h4 className="font-display text-lg text-ink font-semibold">The Atelier Philosophy</h4>
              <p className="text-ink-secondary leading-relaxed font-light">
                <strong>la maia</strong> was born out of frustration with expensive European fragrances that dissolve within two hours in the Indian climate. We craft unhurried, slow-macerated extraits specifically calibrated for humidity and heat.
              </p>
              <a href="/story" className="text-accent font-semibold hover:underline block pt-1">
                Read Full Brand Story &rarr;
              </a>
            </div>

            <div className="col-span-4 space-y-2">
              <h4 className="font-display text-lg text-ink font-semibold">Indian Climate Longevity</h4>
              <p className="text-ink-secondary leading-relaxed font-light">
                Discover our Climate-Lock™ formulation chemistry: 45-day cold vault maceration, high-molecular Ambroxan lipid anchors, and zero synthetic dilution.
              </p>
              <a href="/#solution" className="text-accent font-semibold hover:underline block pt-1">
                Explore Fixative Technology &rarr;
              </a>
            </div>

            <div className="col-span-4 space-y-2">
              <h4 className="font-display text-lg text-ink font-semibold">Legal Metrology &amp; IFRA Standards</h4>
              <p className="text-ink-secondary leading-relaxed font-light">
                Full compliance transparency: Net volume, batch FEFO allocation, dangerous goods surface transport rules, and cosmetics safety declarations.
              </p>
              <a href="/compliance" className="text-accent font-semibold hover:underline block pt-1">
                View Compliance Declarations &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          4. MOBILE SLIDE-OVER DRAWER (Bella Vita Organic Style)
         ========================================================= */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
            <div className="w-screen max-w-sm bg-surface border-r border-line shadow-2xl flex flex-col justify-between overflow-y-auto">
              
              {/* Drawer Header */}
              <div className="p-4 border-b border-line flex items-center justify-between">
                <a href="/" onClick={() => setMobileDrawerOpen(false)} className="inline-flex flex-col">
                  <Wordmark size="md" />
                  <span className="text-[8px] uppercase tracking-widest text-accent font-sans">
                    Atelier de Parfum
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 text-ink hover:text-accent rounded-full"
                  aria-label="Close Navigation"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Search Inside Drawer */}
              <div className="p-4 border-b border-line bg-surface-raised">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setMobileDrawerOpen(false);
                    setSearchModalOpen(true);
                  }}
                  className="flex items-center gap-2 bg-surface border border-line rounded px-3 py-2 text-xs"
                >
                  <svg className="w-4 h-4 text-ink-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search 12H Extraits, Notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-ink placeholder-ink-secondary focus:outline-none"
                  />
                </form>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['Chrono Woods', 'Discovery Set', '12H Wear'].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => {
                        setSearchQuery(q);
                        setMobileDrawerOpen(false);
                        setSearchModalOpen(true);
                      }}
                      className="text-[10px] bg-surface px-2 py-0.5 rounded border border-line text-ink-secondary"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accordion Menu Items */}
              <div className="flex-1 py-2 font-sans text-xs">
                {/* 1. CRAZY DEALS */}
                <div className="border-b border-line/60">
                  <div className="bg-accent/10 p-3.5 flex items-center justify-between">
                    <a
                      href="/#order-form"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="font-bold text-accent flex items-center gap-1.5"
                    >
                      <span>🔥</span>
                      <span>Crazy Deals &bull; Flat 20% Off</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleMobileAccordion('deals')}
                      className="text-accent font-bold p-1"
                    >
                      {mobileAccordions.deals ? '−' : '+'}
                    </button>
                  </div>
                  {mobileAccordions.deals && (
                    <div className="p-3 bg-surface-raised space-y-2 text-xs">
                      <a href="/#order-form" onClick={() => setMobileDrawerOpen(false)} className="block text-ink py-1 hover:text-accent font-medium">
                        &bull; Launch Deal: ₹1,399 (Code LASTING20)
                      </a>
                      <a href="/discovery-sets" onClick={() => setMobileDrawerOpen(false)} className="block text-ink py-1 hover:text-accent">
                        &bull; 100% Full-Size Bottle Voucher Credit
                      </a>
                      <a href="/gifting" onClick={() => setMobileDrawerOpen(false)} className="block text-ink py-1 hover:text-accent">
                        &bull; Twin Fragrance Layering Duo (Save ₹1,200)
                      </a>
                    </div>
                  )}
                </div>

                {/* 2. BESTSELLERS */}
                <div className="border-b border-line/60">
                  <div className="p-3.5 flex items-center justify-between">
                    <a href="/#variants" onClick={() => setMobileDrawerOpen(false)} className="font-semibold text-ink">
                      ⭐ Bestsellers
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleMobileAccordion('bestsellers')}
                      className="text-ink-secondary p-1"
                    >
                      {mobileAccordions.bestsellers ? '−' : '+'}
                    </button>
                  </div>
                  {mobileAccordions.bestsellers && (
                    <div className="p-3 bg-surface-raised space-y-2">
                      <a href="/#variants" onClick={() => setMobileDrawerOpen(false)} className="block text-ink hover:text-accent py-0.5">
                        Chrono Woods (Woody &bull; 12H+)
                      </a>
                      <a href="/#variants" onClick={() => setMobileDrawerOpen(false)} className="block text-ink hover:text-accent py-0.5">
                        Eternal Amber (Warm Amber)
                      </a>
                      <a href="/#variants" onClick={() => setMobileDrawerOpen(false)} className="block text-ink hover:text-accent py-0.5">
                        Infinity Bloom (Floral Sillage)
                      </a>
                      <a href="/#variants" onClick={() => setMobileDrawerOpen(false)} className="block text-ink hover:text-accent py-0.5">
                        24-Hour Oud (Assam Agarwood)
                      </a>
                    </div>
                  )}
                </div>

                {/* 3. ALL PERFUMES */}
                <div className="border-b border-line/60">
                  <div className="p-3.5 flex items-center justify-between">
                    <a href="/fragrances" onClick={() => setMobileDrawerOpen(false)} className="font-semibold text-ink">
                      🌸 Perfumes &amp; Collections
                    </a>
                    <button
                      type="button"
                      onClick={() => toggleMobileAccordion('perfumes')}
                      className="text-ink-secondary p-1"
                    >
                      {mobileAccordions.perfumes ? '−' : '+'}
                    </button>
                  </div>
                  {mobileAccordions.perfumes && (
                    <div className="p-3 bg-surface-raised space-y-2.5">
                      <div className="font-semibold text-accent text-[11px] uppercase tracking-wider">By Gender</div>
                      <a href="/mens-perfume" onClick={() => setMobileDrawerOpen(false)} className="block text-ink hover:text-accent pl-2 font-medium">Men&rsquo;s Perfumes (From ₹499)</a>
                      <a href="/fragrances?audience=women" onClick={() => setMobileDrawerOpen(false)} className="block text-ink hover:text-accent pl-2">Women&rsquo;s Fragrances</a>
                      <a href="/fragrances?audience=unisex" onClick={() => setMobileDrawerOpen(false)} className="block text-ink hover:text-accent pl-2">Unisex &amp; Layering</a>

                      <div className="font-semibold text-accent text-[11px] uppercase tracking-wider pt-2">Seven Families</div>
                      <div className="grid grid-cols-2 gap-1.5 pl-2">
                        <a href="/families/woody" onClick={() => setMobileDrawerOpen(false)} className="text-ink hover:text-accent">Woody</a>
                        <a href="/families/amber" onClick={() => setMobileDrawerOpen(false)} className="text-ink hover:text-accent">Amber</a>
                        <a href="/families/floral" onClick={() => setMobileDrawerOpen(false)} className="text-ink hover:text-accent">Floral</a>
                        <a href="/families/fresh" onClick={() => setMobileDrawerOpen(false)} className="text-ink hover:text-accent">Fresh</a>
                        <a href="/families/citrus" onClick={() => setMobileDrawerOpen(false)} className="text-ink hover:text-accent">Citrus</a>
                        <a href="/families/gourmand" onClick={() => setMobileDrawerOpen(false)} className="text-ink hover:text-accent">Gourmand</a>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. DISCOVERY SETS */}
                <div className="border-b border-line/60 p-3.5 flex items-center justify-between">
                  <a
                    href="/discovery-sets"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="font-semibold text-ink flex items-center gap-2"
                  >
                    <span>🧪 Discovery Sets (5 x 2ml)</span>
                    <span className="bg-emerald-900/10 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded font-bold">100% Voucher</span>
                  </a>
                </div>

                {/* 5. GIFTING */}
                <div className="border-b border-line/60 p-3.5">
                  <a
                    href="/gifting"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="font-semibold text-ink block"
                  >
                    🎁 Gifting &amp; Luxury Boxes
                  </a>
                </div>

                {/* 6. SCENT QUIZ */}
                <div className="border-b border-line/60 p-3.5">
                  <a
                    href="/finder"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="font-semibold text-ink block"
                  >
                    🧭 Fragrance Finder Quiz
                  </a>
                </div>

                {/* 7. OUR STORY & COMPLIANCE */}
                <div className="border-b border-line/60 p-3.5">
                  <a
                    href="/story"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="font-semibold text-ink block"
                  >
                    📖 Atelier Story &amp; Maceration Vaults
                  </a>
                </div>
                <div className="p-3.5">
                  <a
                    href="/compliance"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="text-ink-secondary hover:text-ink block"
                  >
                    ⚖️ Legal Metrology &amp; IFRA Standards
                  </a>
                </div>
              </div>

              {/* Drawer Footer Utility */}
              <div className="p-4 border-t border-line bg-surface-raised space-y-3">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded bg-emerald-800 text-surface text-center font-sans font-semibold text-xs tracking-wider uppercase block shadow"
                >
                  💬 Chat on WhatsApp
                </a>

                <div className="flex items-center justify-between text-xs text-ink-secondary pt-1">
                  <a href="/care" onClick={() => setMobileDrawerOpen(false)} className="hover:text-accent">
                    Track Consignment
                  </a>
                  <span>&bull;</span>
                  <a href="/returns-policy" onClick={() => setMobileDrawerOpen(false)} className="hover:text-accent">
                    7-Day Returns
                  </a>
                  <span>&bull;</span>
                  <a href="/shipping-policy" onClick={() => setMobileDrawerOpen(false)} className="hover:text-accent">
                    Surface Shipping
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          5. SEARCH MODAL DIALOG (Ctrl+K)
         ========================================================= */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setSearchModalOpen(false)}
          />

          <div className="relative bg-surface border border-line rounded-lg shadow-2xl max-w-2xl w-full p-6 space-y-6 z-10 animate-fade-in">
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-line pb-3">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search perfumes by name (Chrono Woods), scent family (Woody), or notes (Jasmine, Amber)..."
                className="flex-1 bg-transparent font-sans text-sm text-ink placeholder-ink-secondary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="text-xs text-ink-secondary hover:text-ink font-mono px-2 py-1 rounded border border-line"
              >
                ESC
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-sans tracking-widest text-ink-secondary font-semibold">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {quickSearchQueries.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchQuery(term)}
                    className="text-xs font-sans px-3 py-1 rounded-full bg-surface-raised border border-line text-ink hover:border-accent transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Filter Results */}
            <div className="space-y-3 max-h-72 overflow-y-auto pt-2 border-t border-line">
              <span className="text-[10px] uppercase font-sans tracking-widest text-ink-secondary font-semibold">
                Suggested Fragrance Extraits
              </span>

              {[
                { name: 'Chrono Woods', category: 'Bold Woody &bull; 28% Extrait', notes: 'Aged Atlas Cedar, Iso E Super, Bergamot', price: '₹1,399' },
                { name: 'Eternal Amber', category: 'Warm Amber &bull; 28% Extrait', notes: 'Golden Benzoin, Spiced Tonka, Vanilla', price: '₹1,399' },
                { name: 'Infinity Bloom', category: 'Floral Sillage &bull; 28% Extrait', notes: 'Night Sambac Jasmine, Damask Rose', price: '₹1,399' },
                { name: '24-Hour Oud', category: 'Signature Oud &bull; 28% Extrait', notes: 'Assam Wild Agarwood, Saffron, Leather', price: '₹1,399' },
                { name: 'Artisanal Discovery Set', category: 'Trial Kit &bull; 5 x 2ml', notes: 'Includes 100% full-size credit voucher', price: '₹999' },
              ]
                .filter(
                  (item) =>
                    !searchQuery ||
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((result) => (
                  <a
                    key={result.name}
                    href="/#variants"
                    onClick={() => setSearchModalOpen(false)}
                    className="p-3 rounded bg-surface-raised hover:bg-surface border border-line/60 hover:border-accent flex items-center justify-between transition-all block group"
                  >
                    <div>
                      <h5 className="font-display text-base text-ink font-semibold group-hover:text-accent">
                        {result.name}
                      </h5>
                      <p className="text-[11px] font-sans text-ink-secondary">
                        <span dangerouslySetInnerHTML={{ __html: result.category }} /> &mdash; {result.notes}
                      </p>
                    </div>
                    <span className="font-display text-accent font-bold text-sm">
                      {result.price}
                    </span>
                  </a>
                ))}
            </div>

            <div className="pt-2 border-t border-line flex items-center justify-between text-[11px] font-sans text-ink-secondary">
              <span>Press <strong>ESC</strong> to close</span>
              <a href="/finder" onClick={() => setSearchModalOpen(false)} className="text-accent hover:underline font-medium">
                Not sure what you like? Take the Scent Quiz &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
