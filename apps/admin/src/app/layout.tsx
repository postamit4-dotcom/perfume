import type { Metadata } from 'next';
import './globals.css';
import { Wordmark, Badge } from '@lamaia/ui';

export const metadata: Metadata = {
  title: 'la maia — Administration & Operations Console',
  description: 'Enterprise operations, batch inventory, and fulfillment management for La Maia',
};

const navigation = [
  { name: 'Overview', href: '/' },
  { name: 'Catalog & SKUs', href: '/catalog' },
  { name: 'Fragrance Profiles', href: '/fragrance-profiles' },
  { name: 'Compliance Declarations', href: '/compliance' },
  { name: 'Inventory & Batches (FEFO)', href: '/inventory' },
  { name: 'Warehouses', href: '/warehouses' },
  { name: 'Orders & Packing', href: '/orders' },
  { name: 'Shipping & Dangerous Goods', href: '/shipping' },
  { name: 'Returns & Damage Claims', href: '/returns' },
  { name: 'Discovery Credits', href: '/credits' },
  { name: 'Fragrance Finder Matrix', href: '/finder-admin' },
  { name: 'CMS & Journal', href: '/cms' },
  { name: 'Settings & Audit Logs', href: '/settings' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#F8F6F2]">
      <body className="min-h-full flex flex-col md:flex-row antialiased text-ink">
        {/* Admin Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-surface border-r border-line/80 flex flex-col justify-between p-5 flex-shrink-0">
          <div className="space-y-6">
            <div className="space-y-1">
              <a href="/" className="inline-block py-1">
                <Wordmark size="md" />
              </a>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] uppercase font-sans tracking-widest text-ink-secondary">
                  Operations Console
                </span>
                <Badge variant="accent" className="text-[9px] py-0 px-1.5">
                  DEV
                </Badge>
              </div>
            </div>

            <nav className="space-y-1" aria-label="Admin Navigation">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded text-xs font-sans tracking-wide text-ink/80 hover:bg-line/25 hover:text-ink transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-line/60 space-y-2 text-xs font-sans text-ink-secondary">
            <div className="flex items-center justify-between">
              <span>Timezone</span>
              <span className="font-mono text-[11px] text-ink">Asia/Kolkata</span>
            </div>
            <div className="flex items-center justify-between">
              <span>API Gateway</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Active
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Admin Bar */}
          <header className="h-16 bg-surface/90 border-b border-line/60 px-6 sm:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-ink-secondary font-sans font-medium">
                La Maia Fragrance Atelier
              </span>
              <span className="text-line text-sm">/</span>
              <span className="text-xs font-sans text-ink">Phase 00 Architecture</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-xs font-sans text-right hidden sm:block">
                <div className="text-ink font-medium">Platform Admin</div>
                <div className="text-[10px] text-ink-secondary">System Bootstrap</div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}

