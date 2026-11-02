import React from 'react';
import { Wordmark } from './Wordmark';

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  navLinks?: NavLink[];
  currentPath?: string;
  onCartClick?: () => void;
  cartCount?: number;
}

const defaultLinks: NavLink[] = [
  { label: 'Fragrances', href: '/fragrances' },
  { label: 'Discovery Sets', href: '/discovery-sets' },
  { label: 'Scent Families', href: '/families' },
  { label: 'Fragrance Finder', href: '/finder' },
  { label: 'Gifting', href: '/gifting' },
  { label: 'Our Story', href: '/story' },
  { label: 'Journal', href: '/journal' },
];

export const Header: React.FC<HeaderProps> = ({
  navLinks = defaultLinks,
  currentPath = '',
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-line/60 bg-surface/95 backdrop-blur-sm transition-all">
      {/* Editorial Announcement Bar */}
      <div className="bg-surface-dark text-surface py-1.5 px-4 text-center text-xs tracking-widest uppercase font-sans">
        <span>Handcrafted Fragrances &bull; Surface Express Shipping across India</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile menu trigger placeholder / search icon */}
        <div className="flex items-center gap-4 lg:hidden">
          <a
            href="/fragrances"
            className="text-xs uppercase tracking-wider text-ink hover:text-accent font-sans"
          >
            Explore
          </a>
        </div>

        {/* Center/Left Wordmark */}
        <div className="flex items-center">
          <a href="/" className="inline-flex items-center py-2" aria-label="la maia homepage">
            <Wordmark size="lg" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-[0.16em] font-sans transition-colors duration-200 py-1 border-b ${
                  isActive
                    ? 'border-accent text-accent font-medium'
                    : 'border-transparent text-ink/80 hover:text-ink hover:border-line'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right utility items */}
        <div className="flex items-center space-x-6">
          <a
            href="/account"
            className="text-xs uppercase tracking-widest text-ink hover:text-accent font-sans hidden sm:inline-block"
          >
            Account
          </a>
          <a
            href="/cart"
            className="text-xs uppercase tracking-widest text-ink hover:text-accent font-sans border border-line px-3 py-1.5 rounded-sm hover:border-ink"
          >
            Bag (0)
          </a>
        </div>
      </div>
    </header>
  );
};

