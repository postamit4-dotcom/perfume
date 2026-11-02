# LA MAIA — Environment Variables Inventory

| Variable Name | Required By | Format / Type | Purpose / Description | Default / Example |
|---|---|---|---|---|
| `NODE_ENV` | All | `development` \| `test` \| `staging` \| `production` | Execution environment | `development` |
| `DATABASE_URL` | API, Worker, Database | PostgreSQL URI | Primary persistent relational database | `postgresql://postgres:postgres@localhost:5432/lamaia_dev` |
| `REDIS_URL` | API, Worker | Redis URI | Cache, rate limiter, and BullMQ queues | `redis://localhost:6379` |
| `PORT` | API | Integer | HTTP listener port for API | `4000` |
| `API_PREFIX` | API | String | URL route prefix for REST endpoints | `v1` |
| `CORS_ORIGIN` | API | Comma-separated URLs | Allowed browser origins | `http://localhost:3000,http://localhost:3001` |
| `JWT_SECRET` | API | String (min 32 chars) | HMAC signing key for sessions | Secure random string |
| `WORKER_PORT` | Worker | Integer | Health check HTTP listener port | `4001` |
| `NEXT_PUBLIC_API_URL` | Storefront, Admin | URL | Public REST API base URL | `http://localhost:4000/v1` |
| `NEXT_PUBLIC_APP_NAME` | Storefront, Admin | String | Application display name | `la maia` |
| `CLOUDINARY_CLOUD_NAME` | API | String | Cloudinary media storage | Configured in Phase 02 |
| `CLOUDINARY_API_KEY` | API | String | Cloudinary media upload key | Configured in Phase 02 |
| `CLOUDINARY_API_SECRET` | API | String | Cloudinary media upload secret | Configured in Phase 02 |
| `RAZORPAY_KEY_ID` | API, Storefront | String | Razorpay public key ID | Configured in Phase 07 |
| `RAZORPAY_KEY_SECRET` | API | String | Razorpay server secret | Configured in Phase 07 |
| `RAZORPAY_WEBHOOK_SECRET` | API | String | Webhook signature verification | Configured in Phase 07 |
| `SHIPROCKET_EMAIL` | API, Worker | String | Shiprocket courier account | Configured in Phase 09 |
| `SHIPROCKET_PASSWORD` | API, Worker | String | Shiprocket courier password | Configured in Phase 09 |

