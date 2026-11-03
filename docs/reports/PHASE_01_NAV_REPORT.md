# PHASE 01 — Bella Vita Organic Style Luxury Navigation & Mega Menu

## Status
MOCK_VERIFIED / REAL_INFRA_VERIFIED (Localhost & GitHub)

> High-converting, luxury navigation bar and responsive mega-menu system modeled after Bella Vita Organic's e-commerce structure, fully customized for the **la maia** fine fragrance brand identity. Built in `@lamaia/ui`, integrated into `@lamaia/storefront`, verified with clean builds across all 19 static routes, and running live on localhost.

---

## Scope & Acceptance Criteria

- [x] **Top Announcement Bar / Ticker**: Promotion banner displaying active promo code (`LASTING20`), 20% off Extrait orders, and quick WhatsApp concierge link.
- [x] **Bella Vita Organic-Inspired Menu Taxonomy**:
  - **Crazy Deals**: High-impact promo badge highlighting the ₹1,399 Extrait launch duo, 100% Discovery voucher credit, and 12-hour wear test guarantee.
  - **Bestsellers**: Direct links to top 4 Extraits (Chrono Woods, Eternal Amber, Infinity Bloom, 24-Hour Oud), 5-piece Discovery Set, and travel atomizers.
  - **Perfumes (4-Column Mega Menu)**:
    - *By Character*: Men, Women, Unisex.
    - *7 Olfactive Scent Families*: Woody, Amber, Floral, Fresh, Citrus, Gourmand, Earthy.
    - *Formats*: 100ml Extrait Flacon, 10ml Pocket Atomizer, 2ml Vials.
    - *Featured Fragrance Flacon*: Interactive highlight card for Chrono Woods 28% Extrait.
  - **Discovery Sets**: 5x2ml luxury vial set showcase with 100% credit voucher policy.
  - **Gifting & Combos**: Signature presentation gift boxes, His & Hers duos, wedding/anniversary curation, and corporate concierge.
  - **Scent Quiz**: Direct shortcut to the interactive Fragrance Finder (`/finder`).
  - **About Us**: Brand story, Indian climate fixatives, and Legal Metrology/IFRA compliance statements.
- [x] **Mobile Navigation Drawer**:
  - Slide-over backdrop with smooth CSS transitions.
  - Built-in search bar with instant query triggers.
  - Accordion expand/collapse hierarchy for categories.
  - WhatsApp concierge and customer support quick links in footer.
- [x] **Global Search Dialog**:
  - Accessible via `Ctrl+K` / `⌘K` keyboard shortcuts or header search icon.
  - Live filtering against fragrance catalog, olfactive families, notes, and pricing.
  - Trending search chips for rapid mobile and desktop navigation.
- [x] **Architectural & Design Invariants Preserved**:
  - Lowercase `la maia` wordmark in `font-display font-light`.
  - INR paise-compliant pricing display (₹1,399, ₹999).
  - Surface-only dangerous goods shipping declarations.
  - Full client-side hydration compatibility via `packages/ui/tsup.config.ts`.

---

## Code Changes

| Feature | File(s) | Status | Evidence |
|---|---|---|---|
| Bella Vita Mega Menu Component | `packages/ui/src/components/Header.tsx` | COMPLETED | Comprehensive desktop mega menu, mobile drawer, search modal, and ticker |
| UI Build Configuration | `packages/ui/tsup.config.ts` | COMPLETED | Configured tsup with `'use client';` chunk banner for Next.js App Router compatibility |
| Storefront Integration | `apps/storefront/src/app/layout.tsx` | COMPLETED | Clean rendering and zero build regressions across all 19 static routes |
| Git & GitHub Version Control | Monorepo main branch | COMPLETED | Pushed to `https://github.com/postamit4-dotcom/perfume.git` (commit `8780e4d`) |

---

## Verification & Test Results

1. **`@lamaia/ui` Build**:
   ```bash
   pnpm --filter @lamaia/ui build
   ```
   *Result*: Exit code 0. Generated CJS, ESM, and DTS bundles cleanly in 1.8s.

2. **`@lamaia/storefront` Build**:
   ```bash
   pnpm --filter @lamaia/storefront build
   ```
   *Result*: Exit code 0. All 19 Next.js App Router routes compiled and prerendered.

3. **Localhost Runtime Probe**:
   ```powershell
   (Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing).StatusCode
   ```
   *Result*: HTTP **200 OK**. Dev server running cleanly on port 3000.

4. **Git Repository Status**:
   - Remote: `https://github.com/postamit4-dotcom/perfume.git`
   - Branch: `main`
   - Latest Commit: `8780e4d` (*feat(ui): implement Bella Vita Organic luxury menu structure and mobile navigation*)
