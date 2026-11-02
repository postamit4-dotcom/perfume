# LA MAIA — Perfume Commerce Codex Master Prompt Pack

> **Project:** La Maia — single-brand, India-first perfume e-commerce platform built from scratch
> **Brand:** la maia — own-label fragrances (eau de parfum, eau de toilette, extrait, attar / perfume oil), discovery sets and gifting
> **Purpose:** A complete execution playbook for Codex covering architecture, a premium fragrance storefront, backend, administration, payments, shipping of flammable goods, returns, compliance, security, testing and deployment.
> **Rule:** Run the prompts sequentially. Never interpret a polished UI or passing mocked test as production readiness.

---

## 0. How to use this file

1. Create a new repository, `lamaia-commerce`.
2. Copy the **Permanent Codex Engineering Contract** (Section 1) into the repository's `AGENTS.md`.
3. Commit this file to `docs/LA_MAIA_PERFUME_CODEX_MASTER_PROMPTS.md` so every prompt can reference it.
4. Run **Prompt 00** in Codex, review its report, and commit the verified result.
5. Run each subsequent phase prompt in a fresh task/session, retaining `AGENTS.md` and all previous reports in the repository.
6. Stop before any production deployment, live charge, refund, shipment purchase, destructive migration, or secret rotation until explicitly approved.
7. If a phase is blocked by missing provider credentials or a business decision, implement safe interfaces, tests and documentation; mark the provider-specific verification BLOCKED rather than inventing success.

### Initial business assumptions (confirm before live launch)

- India-first, single-brand perfume store; INR; Asia/Kolkata.
- La Maia sells only its own fragrances — no third-party designer brands, no marketplace, no seller payouts in v1.
- Product formats: Extrait de Parfum, Eau de Parfum (EDP), Eau de Toilette (EDT), attar / perfume oil, body mist (optional), discovery sets, gift sets, refills (optional, phase 2).
- Sizes per fragrance are SKU variants (e.g. 2 ml sample, 10 ml travel, 50 ml, 100 ml); each size has its own price, MRP, weight, barcode and shipping class.
- **Discovery-set credit:** buying a discovery set may issue a one-time credit redeemable on a full-size bottle within a configurable window. Amount, window and eligibility require business approval.
- One warehouse initially; schema ready for more. Stock is tracked by **batch/lot** with manufacture date and best-before date; allocation is first-expiry-first-out (FEFO).
- Razorpay for prepaid payments; COD optional, with configurable order-value cap, pincode eligibility and OTP/confirmation step (perfume COD tends to carry high return-to-origin risk).
- Shiprocket primary courier aggregator; manual fulfillment fallback.
- **Alcohol-based perfumes are typically treated as flammable / dangerous goods by couriers** — assume surface (ground) shipping only unless the courier explicitly accepts them by air. Oil-based attars may have different rules. Every SKU carries a shipping class; the courier rules must be confirmed with Shiprocket and each courier before launch.
- Opened or used perfume is assumed non-returnable for hygiene reasons; damaged, leaked, wrong or missing items are claimable within a short window with photo/unboxing evidence. Final policy requires business approval.
- Gift wrap, gift message and gift receipt (prices hidden) supported at checkout.
- Cloudinary for public catalog and campaign media; private documents (invoices, claim evidence, licences) use access-controlled storage.
- **Compliance items requiring legal/accounting approval before launch:** GST rate and HSN for each product type, place-of-supply treatment, invoice numbering, Legal Metrology declarations shown online and on pack (MRP, net quantity, manufacturer/packer/importer, month/year of manufacture, consumer-care details, country of origin), cosmetics manufacturing licence and labelling obligations (including ingredient list), IFRA conformity, and allergen disclosure. The system must store and display these fields; it must not invent their values.

---

# 1. Permanent Codex Engineering Contract — save as `AGENTS.md`

```md
# AGENTS.md — LA MAIA (perfume commerce)

You are a principal engineer, architect, security reviewer, product designer and QA lead working on a production-grade single-brand perfume e-commerce system for La Maia. Deliver working, integrated, testable software; not mockups or disconnected pages.

## Fixed architecture
- pnpm workspaces + Turborepo.
- apps/storefront: Next.js App Router + React + TypeScript.
- apps/admin: separate Next.js App Router application.
- apps/api: NestJS REST API with OpenAPI specification.
- apps/worker: Node.js + BullMQ asynchronous worker.
- packages/database: PostgreSQL + Prisma schema, migrations and seed tooling.
- packages/contracts: generated API client and shared validation schemas.
- packages/ui: reusable accessible UI components and La Maia design tokens.
- packages/config, packages/utils, packages/testing.
- Redis for queues, ephemeral caching and rate limits; never source of truth for inventory, credits or payment.
- Cloudinary for public product/campaign media; Razorpay for payments; Shiprocket for shipping.
- Vercel for web apps, Railway for API/worker, managed Postgres and managed Redis.
- Choose mutually compatible supported runtime/package versions and pin them in lockfiles.

## Core engineering invariants
1. Backend owns pricing, discounts, credits, tax, inventory availability, order totals and permissions.
2. Money uses integer minor units (INR paise); no floating-point authoritative totals. Selling price may never exceed the stored MRP for that SKU.
3. Separate state machines for orders, payments, fulfillment, shipments, returns, claims and refunds.
4. Stock is reserved atomically at batch level using Postgres transactions and conditional writes. Never oversell or make available stock negative. Allocation is FEFO; expired or quarantined batches are never sellable.
5. Provider requests occur outside database transactions. Persist intent before external operations and reconcile uncertain outcomes.
6. All externally triggered actions must be idempotent, auditable and recoverable.
7. Durable webhook inbox and transactional outbox patterns for payment/shipment events.
8. Authorization is enforced server-side on every admin operation; UI visibility is not authorization.
9. Prices, MRP, discounts, credits, tax rules, compliance declarations, batch allocation, shipping class, shipping quote and address are snapshotted on the order.
10. Migrations, constraints, indexes and explicit module ownership; no cross-module direct writes.
11. Secure sessions, password hashing, validation, rate limiting, least privilege, secrets management and safe uploads are mandatory.
12. Preserve existing implemented functionality; never silently rewrite or delete it.
13. No fake claims: distinguish mock tests, sandbox tests, real infrastructure verification and production readiness.
14. No real charges, refunds, shipments, production deploys or destructive operations without explicit approval.
15. Document assumptions and blockers. If credentials are missing, provide adapters, mocks and setup instructions, not fabricated integration evidence.

## Perfume-domain invariants
16. Every sellable SKU has: concentration, net volume (ml), MRP, selling price, HSN code reference, shipping class (e.g. FLAMMABLE_SURFACE_ONLY, AIR_ALLOWED), weight and dimensions. Publishing is blocked if any required field is missing.
17. Fragrance profile data — family, top/heart/base notes, mood, season, occasion — is structured data, not free text, so it can drive filters, the fragrance finder and SEO pages.
18. Never fabricate reviews, ratings, longevity scores, "best seller" labels, celebrity endorsements, stock urgency or countdowns. Longevity/projection may only be shown as the brand's own labelled description.
19. Courier selection must respect shipping class: a flammable SKU can never be booked on an air service unless an approved rule permits it.
20. Compliance declarations (Legal Metrology, cosmetics labelling, ingredients/allergens) are rendered on the product page from stored data; they are never invented or auto-generated.
21. Discovery-set credits are single-use, owned by one customer, expire, and are redeemed atomically. Gift messages are treated as untrusted user content.

## UI/UX standard — non-negotiable
- A distinctive, premium fragrance-house experience for la maia — not a generic starter template.
- Cohesive design system: typography scale, spacing grid, colour semantics, scent-family colour tokens, shadows, radii, motion tokens and component states.
- Mobile-first layouts with polished desktop adaptations; 320px through wide screens.
- WCAG 2.2 AA-oriented accessibility: keyboard access, focus visibility, labels, contrast, reduced motion, screen-reader semantics. Scent-family colours never carry meaning alone.
- Every screen needs realistic empty, loading, error, success, disabled and validation states.
- No fake review scores, fabricated stock urgency, deceptive countdowns or dead buttons.
- Optimise responsive product imagery, CLS/LCP, navigation, search and especially checkout performance.
- Storefront and admin have distinct visual personalities but shared engineering conventions.
- Validate UI in real browsers at mobile, tablet and desktop breakpoints. Save screenshot evidence where tooling permits.

## Working method for every phase
1. Inspect code, AGENTS.md, earlier reports, migrations and tests.
2. State the exact phase scope, dependencies, risks and acceptance criteria.
3. Implement complete vertical slices: schema -> domain -> API -> authorization -> UI -> tests.
4. Add unit, integration, negative, concurrency and E2E tests as appropriate.
5. Run lint, typecheck, relevant tests and builds; include exact commands and real results.
6. Fix regressions and update OpenAPI, docs and environment examples.
7. Write docs/reports/PHASE_XX_REPORT.md with changed files, evidence, remaining blockers and next steps.
8. Never label a phase complete if required functionality is only a static UI or unverified integration.

## Evidence categories
NOT_STARTED, IN_PROGRESS, IMPLEMENTED_UNVERIFIED, MOCK_VERIFIED, SANDBOX_VERIFIED, REAL_INFRA_VERIFIED, BLOCKED, PRODUCTION_READY.

## Repository layout
apps/{storefront,admin,api,worker}
packages/{database,contracts,ui,config,utils,testing}
infrastructure/{docker,railway,vercel,monitoring}
docs/{architecture,business-rules,compliance,integrations,security,testing,deployment,reports}
scripts/
.github/workflows/

## Final safety check
Do not report success without code references, test commands and proof. Production readiness requires verified checkout, money/inventory/credit correctness, flammable-goods shipping rules, provider reconciliation, compliance data review, security, monitoring, backups and explicit release approval.
```

---

# 2. La Maia premium UI specification (apply in every UI phase)

## Brand direction

**la maia** — always set in lowercase in the wordmark. The name suggests *maya*: enchantment, illusion, the invisible made felt. The experience should feel like walking into a quiet, sunlit fragrance atelier: unhurried, sensory, editorial and confident. Product-first, story-rich, never loud.

Brand voice: warm, precise, poetic in moderation. Describe scent through memory and material ("first rain on terracotta", "jasmine opening after dusk") followed by clear facts (concentration, notes, size). Avoid clichés like "luxury at its finest", superlatives, and invented claims.

### Visual foundations

- **Palette (configurable tokens, never hardcoded in domain components):**
  - Surface: warm ivory `#F4EEE4`; raised surface `#FBF8F3`
  - Ink: near-black `#1B1916`; secondary text `#5E574E`
  - Line: `#D9CFC1`
  - Accent: aged brass `#9C7440` (hover `#7F5D31`)
  - Dark sections: smoke `#211D1A` with ivory text
  - Scent-family tokens (used for chips, finder results and bottle tints): Floral `#C98B8B`, Woody `#8A6A4F`, Amber `#B5763A`, Fresh `#6F9A94`, Citrus `#C9A43B`, Gourmand `#8E5B4A`, Earthy `#7A6B55`
- **Typography:** an elegant high-contrast serif for display (e.g. Cormorant Garamond) paired with a clean humanist sans for body and UI (e.g. Manrope). Self-host; licensed/open fonts only. Generous letter-spacing for small uppercase labels.
- **Spacing:** 4/8px scale, wide margins, slow section rhythm; let products breathe.
- **Imagery:** bottles photographed on stone, brass, linen and raw ingredients (jasmine, vetiver roots, saffron threads, sandalwood); consistent 4:5 product crops on ivory; editorial lifestyle shots in warm natural light. Never use stock images of other brands' bottles.
- **Signature components:** notes pyramid (top / heart / base), scent-family chips, size selector with price-per-ml, discovery-set builder, gift-wrap option card, fragrance-finder step cards, ingredient story cards, sticky add-to-bag bar on mobile, cart drawer with gift options.
- **Motion:** 150–300ms ease-out, slow fades for editorial sections, a subtle "mist" reveal only where it aids storytelling; honour reduced motion.
- **Mobile:** thumb-reachable add-to-bag, filter drawer for family/notes/concentration/price, one-column checkout, correct numeric keyboards for pincode and phone.
- **Checkout:** distraction-free, transparent totals (MRP, discount, credit, gift wrap, shipping, tax), delivery estimate that reflects surface shipping, COD rules clearly stated, no dark patterns.
- **Admin:** information-dense, calm SaaS UI; fixed navigation, command search, status chips, batch/expiry badges, bulk operations, clear destructive-action confirmation.

### Required storefront pages

Homepage; shop all; collection pages; scent-family pages (floral, woody, amber, fresh, citrus, gourmand, earthy); note pages (e.g. jasmine, vetiver, sandalwood, saffron, oud accord); product page (PDP); discovery sets and set builder; gifting page; fragrance finder quiz and results; search; wishlist; cart; checkout; payment outcome; order confirmation; account/profile; address book; discovery credits; order list/details; tracking; return/claim requests; our story / the perfumer; journal (blog); scent glossary; how to wear and store perfume; contact/support; FAQs; shipping, returns, privacy and terms policies; 404/500; loading and empty states.

### Required admin areas

Overview; products and sizes; fragrance profiles (families, notes library, moods, seasons, occasions); compliance declarations per SKU; categories; collections; discovery-set and gift-set builder; media; inventory, batches and expiry; warehouses; orders; fulfillment; shipments and shipping classes; returns and damage claims; refunds; discovery credits; customers; coupons; campaigns (including festive gifting seasons); CMS pages, journal, homepage sections, navigation; fragrance-finder questions and result mapping; analytics; tax/shipping/store settings; team/roles; audit logs; support tickets; integration health.

### UI acceptance tests

- Test 320px, 375px, 768px, 1024px, 1440px and 1920px viewports.
- Verify keyboard navigation, visible focus, form labels, error announcements, contrast and reduced motion.
- Verify no horizontal overflow, clipped content, dead actions, layout shifts or placeholder production data.
- Test long fragrance names, long note lists, sold-out sizes, single-size products, discovery sets, gift wrap, credits, coupons and API failures.
- Verify every PDP shows compliance declarations from data, and that missing data blocks publishing rather than rendering blanks.
- Run automated accessibility checks plus manual checkout keyboard/screen-reader spot checks.
- Run Lighthouse on representative routes and document results; performance goals are targets, not unverified claims.

---

# 3. Target modules and source-of-truth boundaries

| Domain | Responsibilities | Non-negotiable checks |
|---|---|---|
| Identity | Customer/admin users, sessions, RBAC, addresses | Server-side authorization; session security |
| Catalog | Fragrances, size variants, collections, sets, SEO | SKU uniqueness; required perfume fields before publishing |
| Fragrance profile | Families, notes library, note tiers, mood/season/occasion | Structured data; reused by filters, finder and SEO pages |
| Compliance | MRP, net quantity, manufacturer/packer details, licence refs, ingredients, allergens, country of origin, HSN | Values supplied by business only; versioned; snapshotted on order |
| Media | Cloudinary assets, ownership, lifecycle | Signed operations; upload restrictions |
| Inventory | Warehouses, batches/lots, balances, reservations, ledger | Atomic concurrency; FEFO; no expired/quarantined stock sold |
| Pricing | Price lists, MRP cap, discounts, credits, tax, shipping and gift-wrap charges | Backend-calculated integer totals |
| Sampling | Discovery sets, set builder, discovery credits | Single-use, owner-bound, expiring, atomic redemption |
| Gifting | Gift wrap, gift message, gift receipt, recipient address | Message sanitised; prices hidden on gift receipt |
| Cart | Guest/user cart, merge, save-for-later | Validate current SKU, price and availability |
| Checkout | Address, quotes, reservations, order intent | Idempotency; order snapshots |
| Payments | Razorpay, COD (cap + confirmation), webhooks, reconciliation | Verified events; duplicate-safe state transitions |
| Orders | Order state and immutable purchase history | Valid transitions; auditability |
| Fulfillment | Picking by batch, packing (leak-proof checklist), partial fulfillment | No duplicate fulfillment; batch recorded per unit |
| Shipping | Shiprocket, shipping classes, surface-only rules, AWB, tracking, NDR, RTO | No air booking for flammable SKUs; provider idempotency |
| Returns & claims | Damage/leak/wrong-item claims, unopened returns, inspection | Policy and ownership checks; evidence stored privately |
| Refunds | Partial/full refunds, COD refund workflow, credit reversal | No over-refunding; duplicate-safe |
| Fragrance finder | Questions, answer weights, result mapping, saved results | Deterministic, explainable recommendations |
| CMS | Homepage, journal, glossary, note/family pages, menus, SEO | Published state; safe content |
| Marketing | Coupons, festive campaigns, back-in-stock, sample follow-up | Usage limits, consent, deduplication |
| Reviews | Verified-purchase reviews only, moderation | No seeded or fabricated reviews; no rating schema without real reviews |
| Support | Tickets, messages, internal notes | Customer isolation and admin permissions |
| Analytics | Sales, conversion, sample-to-full-size rate, returns, RTO | Defined metrics and data provenance |
| Operations | Settings, integration health, audit, alerts | Least privilege; traceability |

---

# 4. Exact implementation order and Codex prompts

## Prompt 00 — Bootstrap and production architecture

```text
Read AGENTS.md and the La Maia UI specification in docs/LA_MAIA_PERFUME_CODEX_MASTER_PROMPTS.md.

TASK: Build the new lamaia-commerce monorepo from scratch.

Create pnpm/Turborepo workspaces, apps/storefront, apps/admin, apps/api, apps/worker, shared packages, strict TypeScript, lint/format config, environment validation, health/readiness endpoints, API error conventions, structured logs, OpenAPI setup, Docker-based local Postgres/Redis, CI and developer documentation.

Implement the La Maia design tokens in packages/ui (palette, scent-family tokens, type scale, spacing, radii, motion) and polished but minimal storefront and admin shells: lowercase "la maia" wordmark, header, footer, navigation placeholders that lead to real "coming soon" routes, not dead links. Do not create fake shopping flows.

Deliver architecture ADRs, dependency graph, environment variable inventory, start/build/test commands and initial deployment topology. Create docs/compliance/OPEN_QUESTIONS.md listing every legal, tax, shipping and policy decision from Section 0 that needs business approval. Verify every app starts and builds and that API health checks pass. Write docs/reports/PHASE_00_REPORT.md with real evidence.

Do not deploy or touch live services. Start coding now.
```

## Prompt 01 — Identity, database and admin security
## Prompt 02 — Fragrance catalog, profiles, compliance data and Cloudinary
## Prompt 03 — Inventory, batches and warehouses
## Prompt 04 — Premium storefront, discovery and fragrance finder
## Prompt 05 — Accounts, wishlist, scent profile and cart
## Prompt 06 — Pricing, credits, gifting, tax and checkout
## Prompt 07 — Razorpay, COD and reconciliation
## Prompt 08 — Orders, invoices and fulfillment
## Prompt 09 — Shiprocket, flammable-goods rules and tracking
## Prompt 10 — Returns, damage claims, exchanges and refunds
## Prompt 11 — Full admin, CMS, SEO content and analytics
## Prompt 12 — Notifications, support and marketing
## Prompt 13 — Production hardening and release readiness

---

# 5. Mandatory database entity checklist
(See full entity checklist in Section 5)

# 6. Production-critical failure scenarios
(See 27 critical failure scenarios in Section 6)

# 7. Standard phase report template
(See phase report template in Section 7)

# 8. Final launch checklist
(See checklist in Section 8)

