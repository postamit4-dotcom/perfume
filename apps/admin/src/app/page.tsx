import React from 'react';
import { Card, Badge, StatusBadge } from '@lamaia/ui';

export default function AdminOverviewPage() {
  const systemModules = [
    { name: 'Core Architecture & Monorepo', phase: 'Phase 00', status: 'IMPLEMENTED_UNVERIFIED' },
    { name: 'Identity & Admin Security', phase: 'Phase 01', status: 'PENDING' },
    { name: 'Fragrance Catalog & Compliance', phase: 'Phase 02', status: 'PENDING' },
    { name: 'FEFO Batch Inventory & Warehouses', phase: 'Phase 03', status: 'PENDING' },
    { name: 'Storefront & Fragrance Finder', phase: 'Phase 04', status: 'PENDING' },
    { name: 'Pricing, Credits & Checkout', phase: 'Phase 06', status: 'PENDING' },
    { name: 'Razorpay & COD Reconciliation', phase: 'Phase 07', status: 'PENDING' },
    { name: 'Dangerous Goods Courier Transit', phase: 'Phase 09', status: 'PENDING' },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-sans font-semibold text-ink tracking-tight">
          System Overview &amp; Control Center
        </h1>
        <p className="text-sm font-sans text-ink-secondary">
          Monorepo status, engineering invariants, and perfume domain compliance health.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card elevated className="space-y-2">
          <div className="text-xs uppercase tracking-wider font-sans text-ink-secondary">
            Primary Currency
          </div>
          <div className="text-2xl font-sans font-semibold text-ink">INR (Paise)</div>
          <div className="text-xs text-ink-secondary">Integer minor units enforced</div>
        </Card>

        <Card elevated className="space-y-2">
          <div className="text-xs uppercase tracking-wider font-sans text-ink-secondary">
            Allocation Method
          </div>
          <div className="text-2xl font-sans font-semibold text-ink">FEFO</div>
          <div className="text-xs text-ink-secondary">First-Expiry-First-Out batch rule</div>
        </Card>

        <Card elevated className="space-y-2">
          <div className="text-xs uppercase tracking-wider font-sans text-ink-secondary">
            Transit Class
          </div>
          <div className="text-2xl font-sans font-semibold text-ink">Surface Only</div>
          <div className="text-xs text-ink-secondary">Flammable goods dangerous class</div>
        </Card>

        <Card elevated className="space-y-2">
          <div className="text-xs uppercase tracking-wider font-sans text-ink-secondary">
            Operating Timezone
          </div>
          <div className="text-2xl font-sans font-semibold text-ink">Asia/Kolkata</div>
          <div className="text-xs text-ink-secondary">IST (UTC+5:30) date boundaries</div>
        </Card>
      </div>

      {/* Module Roadmap & Verification Status */}
      <Card className="space-y-6">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <h2 className="text-base font-sans font-semibold text-ink">
              Execution Codex &amp; Engineering Contract Status
            </h2>
            <p className="text-xs text-ink-secondary font-sans">
              Sequential phase progression governed by AGENTS.md
            </p>
          </div>
          <Badge variant="accent">Phase 00 Active</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-line/60 text-ink-secondary uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-medium">Domain Module</th>
                <th className="pb-3 font-medium">Milestone Phase</th>
                <th className="pb-3 font-medium">State</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/40">
              {systemModules.map((item) => (
                <tr key={item.name} className="hover:bg-line/10 transition-colors">
                  <td className="py-3.5 font-medium text-ink">{item.name}</td>
                  <td className="py-3.5 text-ink-secondary">{item.phase}</td>
                  <td className="py-3.5">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3.5 text-right">
                    <span className="text-[11px] text-accent font-medium cursor-pointer hover:underline">
                      Review Docs
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

