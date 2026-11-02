# PHASE 00 — Bootstrap and Production Architecture

## Status
MOCK_VERIFIED

> All 4 applications and 6 shared packages build, typecheck, pass tests, start up, and serve HTTP responses locally. API health, readiness, and OpenAPI endpoints have been directly probed and verified. External third-party cloud services (managed DB, Redis, Cloudinary, Razorpay, Shiprocket) remain unconfigured/mocked until their respective subsequent phases.

---

## Scope and Acceptance Criteria

- [x] Establish pnpm workspace and Turborepo monorepo configuration with strict TypeScript, ESLint, Prettier, and CI definitions.
- [x] Deliver 4 applications: `apps/storefront` (Next.js 14 App Router), `apps/admin` (Next.js 14 App Router), `apps/api` (NestJS REST API), `apps/worker` (Node.js + BullMQ worker).
- [x] Deliver 6 shared packages: `packages/config`, `packages/contracts`, `packages/database`, `packages/ui`, `packages/utils`, `packages/testing`.
- [x] Implement the La Maia luxury design system in `packages/ui` (palette, typography scale, spacing grid, radii, motion tokens, 7 scent family tokens, accessible components, and Tailwind preset).
- [x] Implement minimal storefront and admin shells featuring the lowercase "la maia" wordmark, header, footer, navigation placeholders with real "coming soon" routes (no dead links, no fake shopping flows).
- [x] Provide OpenAPI (Swagger) setup at `/docs`, health and readiness probes (`/v1/health`, `/v1/health/live`, `/v1/health/ready`), RFC 7807 error filtering, and structured request logging.
- [x] Document architecture ADRs, dependency graph, environment variable inventory, deployment topology, and create `docs/compliance/OPEN_QUESTIONS.md`.
- [x] Verify that all 4 applications build cleanly and start up locally, with health endpoints responding.

---

## Code Changes

| Feature | File(s) | Status | Evidence |
|---|---|---|---|
| Monorepo Architecture | `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `tsconfig.base.json`, `.npmrc` | COMPLETED | `pnpm` workspace with 10 workspace packages configured |
| Shared Config & Env | `packages/config/src/env.ts`, `packages/config/src/index.ts` | COMPLETED | Zod validation for API, Worker, Storefront, Admin envs |
| Currency, Date & Slug Utils | `packages/utils/src/currency.ts`, `date.ts`, `slug.ts`, `sanitize.ts` | COMPLETED | Invariant 2 (paise, MRP cap), IST formatting, 7 unit tests pass |
| Shared Contracts & DTOs | `packages/contracts/src/enums.ts`, `api-errors.ts`, `health.dto.ts`, `compliance.dto.ts` | COMPLETED | Shared domain enums, RFC 7807 problem details schema |
| Prisma Schema & DB | `packages/database/prisma/schema.prisma`, `src/index.ts`, `src/seed.ts` | COMPLETED | Prisma client v5.22.0 generated covering Section 5 entity checklist |
| Design Tokens & UI Library | `packages/ui/src/tokens/*`, `components/*`, `tailwind/preset.ts` | COMPLETED | Cormorant Garamond / Manrope typography, 7 scent tokens, accessible components |
| NestJS REST API | `apps/api/src/main.ts`, `app.module.ts`, `health/*`, `common/*` | COMPLETED | OpenAPI `/docs`, `/v1/health` probes, exception filter |
| BullMQ Worker & Health | `apps/worker/src/index.ts`, `queue.ts` | COMPLETED | BullMQ initialization and HTTP health server on port 4001 |
| Storefront Web App | `apps/storefront/src/app/*`, `src/components/*` | COMPLETED | Next.js 14 App Router, 18 static routes generated, wordmark & shells |
| Admin Web App | `apps/admin/src/app/*`, `src/components/*` | COMPLETED | Next.js 14 App Router, 16 static routes generated, fixed navigation |
| CI & Infrastructure | `.github/workflows/ci.yml`, `infrastructure/docker/docker-compose.yml`, `infrastructure/railway/railway.json` | COMPLETED | PostgreSQL 16 & Redis 7 Docker compose, GitHub Actions workflow |
| Documentation | `docs/compliance/OPEN_QUESTIONS.md`, `docs/architecture/*` | COMPLETED | ADR-001, dependency graph, env inventory, compliance open questions |

---

## Database Changes

- **Schema definition:** `packages/database/prisma/schema.prisma` created covering Identity (User, Session, Role, Permission, Address, AuditLog), Catalog (Fragrance, Product, ProductVariant, ComplianceDeclaration, ProductMedia), Inventory (Warehouse, Batch, InventoryBalance, InventoryMovement), Commerce (Cart, Wishlist, DiscoveryCredit, Order, OrderItem, PaymentTransaction), and Fragrance Finder (FinderQuestion, FinderAnswer, FinderWeight).
- **Prisma Client:** Generated successfully (Prisma Client v5.22.0).
- **Migrations:** Baseline migration will be executed against PostgreSQL in Phase 01.

---

## API Changes

- `GET /v1/health`: Overall health and readiness probe reporting status of downstream dependencies.
- `GET /v1/health/live`: Liveness probe for Kubernetes / Railway container monitoring.
- `GET /v1/health/ready`: Readiness probe for traffic routing.
- `GET /docs`: Interactive Swagger OpenAPI documentation and schema explorer.
- Standardized error format: RFC 7807 compliant JSON with `statusCode`, `code`, `message`, `path`, `timestamp`, and `correlationId` via `x-correlation-id` header middleware.

---

## UI Verification

- **Storefront Shell (`apps/storefront`):**
  - Route `/`: Hero section ("the invisible made felt"), 7 Scent Family pills, Discovery Set promotion with full-size bottle credit explanation, statutory compliance banner.
  - Active Routes: `/fragrances`, `/discovery-sets`, `/families`, `/families/[family]`, `/finder`, `/gifting`, `/story`, `/journal`, `/glossary`, `/care`, `/shipping-policy`, `/returns-policy`, `/compliance`, `/account`, `/cart`.
  - Statically generated: 18 routes, 0 build errors.
- **Admin Shell (`apps/admin`):**
  - Route `/`: Operations Console with system status KPI widgets (INR paise, FEFO, Surface Only, Asia/Kolkata), module readiness table.
  - Active Routes: `/catalog`, `/fragrance-profiles`, `/compliance`, `/inventory`, `/warehouses`, `/orders`, `/shipping`, `/returns`, `/credits`, `/finder-admin`, `/cms`, `/settings`.
  - Statically generated: 16 routes, 0 build errors.

---

## Commands Executed

| Command | Result | Evidence |
|---|---|---|
| `pnpm approve-builds --all` | Success (Exit code 0) | Approved lifecycle scripts for `@nestjs/core`, `@prisma/client`, `esbuild` |
| `pnpm --filter @lamaia/database generate` | Success (Exit code 0) | Generated Prisma Client (v5.22.0) |
| `pnpm --filter "./packages/*" build` | Success (Exit code 0) | Built `@lamaia/config`, `@lamaia/contracts`, `@lamaia/database`, `@lamaia/testing`, `@lamaia/ui`, `@lamaia/utils` |
| `pnpm test` | Success (Exit code 0) | 8 turbo tasks completed, 10 tests passed across packages and apps |
| `pnpm typecheck` | Success (Exit code 0) | 15 turbo tasks passed with zero TypeScript diagnostics |
| `pnpm --filter @lamaia/api build` | Success (Exit code 0) | NestJS compilation output in `apps/api/dist/main.js` |
| `pnpm --filter @lamaia/worker build` | Success (Exit code 0) | Worker bundle in `apps/worker/dist/index.js` |
| `pnpm --filter @lamaia/storefront build` | Success (Exit code 0) | 18 static routes generated in `apps/storefront/.next/` |
| `pnpm --filter @lamaia/admin build` | Success (Exit code 0) | 16 static routes generated in `apps/admin/.next/` |
| Node API health probe (`node dist/main.js`) | Success (Exit code 0) | Port 4000 live; `/v1/health/live` returned status `ok`, Swagger docs returned 200 |
| Node Worker health probe (`node dist/index.js`) | Success (Exit code 0) | Port 4001 live; `/health` returned status `ok` |
| Storefront server probe (`next start -p 3000`) | Success (Exit code 0) | Port 3000 responded with HTTP 200 (40.3 KB HTML) |
| Admin server probe (`next start -p 3001`) | Success (Exit code 0) | Port 3001 responded with HTTP 200 (32.1 KB HTML) |

---

## Security and Failure Tests

- **Integer Money Validation:** Unit tests verified that non-integer values and selling prices exceeding MRP throw validation failures.
- **Gift Message Sanitization:** Unit tests verified that `<script>` tags and JavaScript URLs are stripped, and messages exceeding 300 characters fail validation.
- **API Error Filter:** Verified that uncaught exceptions return structured `ApiErrorResponse` objects with correlation IDs without leaking internal stack traces in client payloads.
- **Environment Validation:** Verified that missing or invalid configuration causes bootstrap failure via strict Zod parsing before traffic is accepted.

---

## Perfume-Domain Checks

- **MRP Cap Rule:** Implemented in `@lamaia/utils` (`validateSellingPrice`) and verified in unit tests.
- **Scent Family Color Tokens:** Defined 7 olfactive family tokens in `@lamaia/ui` with high-contrast text accessibility conforming to WCAG 2.2 AA.
- **Statutory Declarations Schema:** Created in `@lamaia/contracts` (`ComplianceDeclarationSchema`) requiring manufacturer, packer, consumer care helpline, HSN, and allergens before publication.
- **Shipping Class Enum:** Defined `FLAMMABLE_SURFACE_ONLY`, `NON_FLAMMABLE_SURFACE_ONLY`, and `AIR_ALLOWED` in `@lamaia/contracts` to enforce surface-only transit for alcohol-based perfumes.

---

## Third-Party Integration Status

| Provider | Purpose | Status | Details |
|---|---|---|---|
| PostgreSQL (Local/Docker) | Authoritative database | MOCK_VERIFIED | Schema defined; Docker compose configured; local Prisma generation verified |
| Redis (Local/Docker) | Queue broker & caching | MOCK_VERIFIED | Docker compose configured; BullMQ queue initialized in worker |
| Cloudinary | Media storage | NOT_STARTED | Interfaces planned for Phase 02 |
| Razorpay | Prepaid payments | NOT_STARTED | Interfaces planned for Phase 07 |
| Shiprocket | Courier fulfillment | NOT_STARTED | Interfaces planned for Phase 09 |

---

## Open Blockers and Business Decisions

See full details in [`docs/compliance/OPEN_QUESTIONS.md`](../compliance/OPEN_QUESTIONS.md). Key decisions required from business and legal owners before Phase 01/02:
1. Exact 8-digit HSN codes (e.g. 3303 00 10 vs 3303 00 20) and applicable GST rate schedule (18% vs 28%).
2. State Cosmetics Manufacturing Licence number(s) and factory packer addresses for Legal Metrology declarations.
3. Courier dangerous goods agreement confirming surface carriage authorization for Class 3 flammable goods.
4. Official return, leakage claims, and discovery-set credit redemption policies.

---

## Next Phase Prerequisites

- **Phase 01:** Identity, Database, and Admin Security.
- Prerequisites: Disposable PostgreSQL 16 container running locally for Prisma migration execution and integration test coverage.
