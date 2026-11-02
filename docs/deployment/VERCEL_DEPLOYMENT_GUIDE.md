# Deploying LA MAIA Storefront Live on Vercel

This guide outlines how to deploy the **la maia** Next.js storefront live to production on Vercel from your GitHub repository:
`https://github.com/postamit4-dotcom/perfume`

---

## Method 1: Instant 1-Click Import via Vercel Dashboard (Recommended)

1. Open **[vercel.com/new](https://vercel.com/new)** and sign in with your GitHub account.
2. Select **Import Git Repository** and choose **`postamit4-dotcom/perfume`**.
3. In the **Configure Project** screen:
   - **Project Name:** `lamaia-storefront` (or your preferred name)
   - **Framework Preset:** `Next.js`
   - **Root Directory:** Click **Edit** and select **`apps/storefront`**.
   - **Include source files outside of the Root Directory in the Build Step:** Ensure this is **Checked** (Enabled by default for monorepos).
4. **Build and Output Settings:**
   - **Build Command:** Override and set to:
     ```bash
     cd ../.. && pnpm turbo run build --filter=@lamaia/storefront...
     ```
   - **Output Directory:** `.next`
   - **Install Command:** `pnpm install`
5. **Environment Variables:**
   Add any optional client or API environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL (e.g. `https://api.lamaia.in/v1` or Railway URL)
   - `NEXT_PUBLIC_APP_ENV`: `production`
6. Click **Deploy**.
7. Vercel will install workspace dependencies, build `@lamaia/ui`, `@lamaia/contracts`, `@lamaia/config`, `@lamaia/utils`, compile Next.js static pages, and assign your live production URL (e.g., `https://lamaia-storefront.vercel.app`).

---

## Method 2: Deploy via Vercel CLI

If you prefer deploying directly from your terminal using Vercel CLI:

1. In your terminal, run:
   ```powershell
   npx vercel
   ```
2. Follow the interactive prompts:
   - *Set up and deploy?* **Y**
   - *Which scope?* (Select your Vercel account)
   - *Link to existing project?* **N**
   - *What's your project's name?* `lamaia-storefront`
   - *In which directory is your code located?* `apps/storefront`
   - *Want to modify build settings?* **Y**
     - Build Command: `cd ../.. && pnpm turbo run build --filter=@lamaia/storefront...`
     - Output Directory: `.next`
3. To deploy directly to production:
   ```powershell
   npx vercel --prod
   ```

---

## Deploying the Admin Portal (`apps/admin`)

To deploy the administrative application as a separate project on Vercel:
- **Root Directory:** `apps/admin`
- **Build Command:** `cd ../.. && pnpm turbo run build --filter=@lamaia/admin...`
- **Output Directory:** `.next`
