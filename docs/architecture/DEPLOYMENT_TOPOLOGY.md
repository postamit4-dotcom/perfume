# LA MAIA — Deployment & Runtime Topology

## Target Hosting Architecture

```mermaid
flowchart TD
  subgraph Edge / Client Tier
    UserBrowser["Customer Mobile / Desktop Browser"]
    AdminBrowser["Operations / Warehouse Browser"]
  end

  subgraph Vercel
    StorefrontApp["Storefront (Next.js App Router)"]
    AdminApp["Admin Console (Next.js App Router)"]
  end

  subgraph Railway Infrastructure
    ApiGateway["API Service (NestJS Container)"]
    WorkerService["Background Worker (BullMQ Container)"]
    ManagedPostgres[("Managed PostgreSQL 16")]
    ManagedRedis[("Managed Redis 7")]
  end

  subgraph External Cloud Services
    Cloudinary["Cloudinary (CDN & Product Media)"]
    Razorpay["Razorpay (Prepaid Gateway & Webhooks)"]
    Shiprocket["Shiprocket (Surface Courier API)"]
  end

  UserBrowser -->|HTTPS| StorefrontApp
  AdminBrowser -->|HTTPS| AdminApp
  StorefrontApp -->|REST API (HTTPS)| ApiGateway
  AdminApp -->|REST API (HTTPS)| ApiGateway

  ApiGateway --> ManagedPostgres
  ApiGateway --> ManagedRedis
  WorkerService --> ManagedPostgres
  WorkerService --> ManagedRedis

  ApiGateway -->|Signed Uploads| Cloudinary
  ApiGateway -->|Order Creation| Razorpay
  ApiGateway -->|Surface Rates| Shiprocket
  WorkerService -->|Status Polling & Sync| Shiprocket
  Razorpay -->|Webhooks| ApiGateway
```

## Service Responsibility Matrix

- **Vercel**: Edge caching, image optimization for storefront Next.js app, static assets, and administration web UI.
- **Railway Container 1 (`api`)**: REST API listening on port 4000, OpenAPI swagger documentation on `/docs`, health checks on `/v1/health`, strict JWT session validation, and database transactions.
- **Railway Container 2 (`worker`)**: Asynchronous BullMQ background worker listening for task queues, processing outbox events, sending reminder notifications, and polling shipping tracking updates.
- **Railway Database (`postgres`)**: Authoritative data store for all inventory balances, orders, users, and audit logs.
- **Railway Redis (`redis`)**: High-performance broker for BullMQ queues, rate limiting, and ephemeral cart caches.

