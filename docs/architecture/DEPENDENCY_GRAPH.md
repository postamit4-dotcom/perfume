# LA MAIA — Workspace Dependency Graph

This document details the dependencies and boundaries between applications and shared packages in the `lamaia-commerce` workspace.

```mermaid
graph TD
  subgraph Apps
    Storefront["apps/storefront (Next.js 14)"]
    Admin["apps/admin (Next.js 14)"]
    API["apps/api (NestJS)"]
    Worker["apps/worker (Node.js + BullMQ)"]
  end

  subgraph Packages
    UI["packages/ui"]
    Contracts["packages/contracts"]
    Database["packages/database"]
    Utils["packages/utils"]
    Config["packages/config"]
    Testing["packages/testing"]
  end

  Storefront --> UI
  Storefront --> Contracts
  Storefront --> Utils
  Storefront --> Config

  Admin --> UI
  Admin --> Contracts
  Admin --> Utils
  Admin --> Config

  API --> Contracts
  API --> Database
  API --> Utils
  API --> Config

  Worker --> Contracts
  Worker --> Database
  Worker --> Utils
  Worker --> Config

  UI --> Utils
  Database --> Config
  Testing --> Contracts
```

## Package Rules & Boundaries

1. **`packages/ui`**: Contains design tokens, styling presets, and UI components. Never imports `packages/database` or server-only secrets.
2. **`packages/contracts`**: Pure schemas (Zod) and TypeScript types. Zero side effects or native bindings. Safe to import anywhere.
3. **`packages/database`**: Prisma client and database models. Imported ONLY by server-side runtimes (`apps/api`, `apps/worker`). Forbidden in `apps/storefront` or `apps/admin` client code.
4. **`packages/utils`**: Deterministic financial math, date logic, and sanitization functions. Fully portable.
5. **`packages/config`**: Environment variable validation schemas using Zod.

