# ADR 001: Monorepo Architecture & Technology Stack

## Status
ACCEPTED

## Date
2026-11-02

## Context
La Maia requires a single-brand, India-first perfume e-commerce system built from scratch. The system must support a luxury editorial storefront, an enterprise operations/fulfillment console, an authoritative backend API enforcing strict money/inventory/compliance rules, and an asynchronous worker for background queues and provider reconciliation.

## Decisions

### 1. Monorepo Tooling: pnpm Workspaces + Turborepo
- **Decision:** Use `pnpm` with workspaces and `turbo` for build orchestration and cache pipelining.
- **Rationale:** Strict dependency isolation, symlinked workspace packages without bundle duplication, and rapid incremental builds across frontend and backend services.

### 2. Applications Layout
- `apps/storefront`: Next.js (App Router) + React + TypeScript + Tailwind CSS. Optimized for sensory editorial storytelling, Core Web Vitals, and responsive mobile commerce.
- `apps/admin`: Next.js (App Router) + React + TypeScript. Dedicated operations console with fixed navigation and high information density.
- `apps/api`: NestJS REST API with OpenAPI (Swagger) documentation, structured request logging, and unified RFC 7807 problem details exception filtering.
- `apps/worker`: Node.js + BullMQ for background job scheduling, payment/shipment webhooks, and asynchronous reconciliation.

### 3. Shared Packages
- `packages/contracts`: Zod schemas, OpenAPI DTOs, and shared domain enums (`Concentration`, `ShippingClass`, `BatchStatus`).
- `packages/database`: PostgreSQL schema via Prisma ORM, migrations, and seed tooling.
- `packages/ui`: La Maia design system tokens (warm ivory, aged brass, deep smoke, 7 scent family tokens), accessible UI components, and Tailwind preset.
- `packages/utils`: Money minor-unit calculations (INR paise), IST timezone formatting, URL slugify, and sanitizers.
- `packages/config`: Strongly-typed environment validation schemas with Zod.
- `packages/testing`: Vitest fixtures, mock factories, and testing helpers.

### 4. Core Domain Invariants
- **Money:** Authoritative pricing and balances are stored and calculated strictly in integer minor units (INR paise). Floating point arithmetic is forbidden for financial totals.
- **MRP Ceiling:** Selling price can never exceed the stored Maximum Retail Price (MRP).
- **Batch Inventory (FEFO):** Stock is tracked at batch level with manufacture date and best-before date. Allocation follows First-Expiry-First-Out. Expired and quarantined batches cannot be allocated.
- **Dangerous Goods Shipping:** Alcohol-based fragrances are classified as `FLAMMABLE_SURFACE_ONLY`. Air booking is blocked at API quote and order creation layers.

## Consequences
- Single repository for full lifecycle development, testing, and continuous integration.
- Type safety shared end-to-end from database schema through REST API contracts to storefront and admin UI components.

