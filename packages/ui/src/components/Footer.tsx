import React from 'react';
import { Wordmark } from './Wordmark';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-dark text-surface/90 pt-16 pb-12 border-t border-line/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          {/* Brand Philosophy */}
          <div className="space-y-4 md:col-span-1">
            <Wordmark dark size="lg" />
            <p className="text-sm font-sans text-surface/70 leading-relaxed font-light">
              the invisible made felt. unhurried, editorial fragrances crafted in India.
              Extrait, EDP, and artisanal attars.
            </p>
            <div className="pt-2 text-xs font-sans text-surface/50 tracking-wider">
              ASIA / KOLKATA (IST)
            </div>
          </div>

          {/* Scent Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-sans uppercase tracking-widest text-accent-subtle">
              Fragrance Atelier
            </h3>
            <ul className="space-y-2 text-xs font-sans text-surface/75">
              <li>
                <a href="/fragrances" className="hover:text-surface transition-colors">
                  All Fragrances
                </a>
              </li>
              <li>
                <a href="/discovery-sets" className="hover:text-surface transition-colors">
                  Discovery Sets & Sample Credit
                </a>
              </li>
              <li>
                <a href="/families" className="hover:text-surface transition-colors">
                  Scent Families
                </a>
              </li>
              <li>
                <a href="/finder" className="hover:text-surface transition-colors">
                  Scent Finder Quiz
                </a>
              </li>
              <li>
                <a href="/gifting" className="hover:text-surface transition-colors">
                  Gifting & Wrap
                </a>
              </li>
            </ul>
          </div>

          {/* Education & Journal */}
          <div className="space-y-3">
            <h3 className="text-xs font-sans uppercase tracking-widest text-accent-subtle">
              The Journal
            </h3>
            <ul className="space-y-2 text-xs font-sans text-surface/75">
              <li>
                <a href="/story" className="hover:text-surface transition-colors">
                  Our Story & The Perfumer
                </a>
              </li>
              <li>
                <a href="/journal" className="hover:text-surface transition-colors">
                  Editorial Journal
                </a>
              </li>
              <li>
                <a href="/glossary" className="hover:text-surface transition-colors">
                  Scent Notes Glossary
                </a>
              </li>
              <li>
                <a href="/care" className="hover:text-surface transition-colors">
                  Storage & Flammable Care
                </a>
              </li>
            </ul>
          </div>

          {/* Policies & Compliance */}
          <div className="space-y-3">
            <h3 className="text-xs font-sans uppercase tracking-widest text-accent-subtle">
              Policies & Compliance
            </h3>
            <ul className="space-y-2 text-xs font-sans text-surface/75">
              <li>
                <a href="/shipping-policy" className="hover:text-surface transition-colors">
                  Surface Shipping & Dangerous Goods
                </a>
              </li>
              <li>
                <a href="/returns-policy" className="hover:text-surface transition-colors">
                  Returns & Leakage Claims
                </a>
              </li>
              <li>
                <a href="/compliance" className="hover:text-surface transition-colors">
                  Legal Metrology & Ingredients
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-surface transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-surface transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Metrology & Packaging Compliance Notice */}
        <div className="pt-8 pb-4 text-xs font-sans text-surface/50 leading-relaxed space-y-2">
          <p>
            <strong>Statutory Compliance & Legal Metrology Notice:</strong> All la maia fragrances are
            manufactured and packed in India in accordance with Cosmetics Rules, 2020. Declarations
            including Net Volume (ml), Maximum Retail Price (MRP inclusive of all taxes), Month &amp; Year of
            Manufacture, Batch/Lot Number, Best Before Date, Manufacturer/Packer Details, and Customer Care
            information are displayed on individual product pages and outer packaging.
          </p>
          <p>
            Alcohol-based fragrances are classified as flammable / dangerous goods under postal/courier
            guidelines and are dispatched exclusively via authorized surface transit routes.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-surface/40 border-t border-white/5">
          <p>&copy; {new Date().getFullYear()} la maia. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Crafted with care in India</p>
        </div>
      </div>
    </footer>
  );
};

