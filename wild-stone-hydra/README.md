# Wild Stone Hydra Energy — Premium Perfume E-Commerce Platform

A luxurious, cinematic, high-conversion perfume e-commerce web application created for **Wild Stone Hydra Energy Eau De Parfum**. Built with a modern dark navy oceanic aesthetic, deep sea caustics, interactive bubble dynamics, and a full e-commerce checkout flow.

---

## 🌟 Key Highlights & Brand Direction

- **Brand:** Wild Stone Haute Parfumerie
- **Hero Product:** Wild Stone Hydra Energy Eau De Parfum (Using the authentic uploaded flacon visual without distortion)
- **Design Aesthetic:** Deep Oceanic Navy (`#020612`, `#040E1F`), Electric Cyan (`#00D2FF`, `#38BDF8`), Frosted Glassmorphism, and Atmospheric Caustic Light Beams.
- **Audio Synthesizer:** Pure Web Audio API oceanic wave & chime ambient soundscape (toggleable in navigation bar).
- **Interactive Visual Effects:**
  - Dynamic 60+ HTML5 Canvas floating underwater bubbles with physics wobble, cursor repulsion, and click-burst micro-bubbles.
  - Swaying underwater God-rays / caustic light beam engine.
  - 3D mouse parallax tilt on the hero bottle with soft caustic floor reflection.
  - Interactive Olfactory Pyramid breakdown with projection duration tiers.

---

## 💎 Features & E-Commerce Capabilities

### 1. Cinematic Hero Section
- Bold headline: **UNLEASH THE POWER OF FRESHNESS**
- Subheadline: *"Experience the energy of the ocean with a bold, refreshing fragrance designed to make every moment unforgettable."*
- Prominently showcases the original uploaded bottle flacon.
- CTAs: **SHOP NOW — ₹799** and **EXPLORE THE FRAGRANCE**.
- Longevity and EDP grade badges.

### 2. Sticky Glassmorphic Navigation
- Brand wordmark: **WILD STONE • Haute Parfumerie**
- Navigation links with smooth scroll to sections.
- Audio atmosphere toggle button.
- Global Search modal (`Ctrl+K` shortcut).
- Wishlist drawer with live counter badge.
- Shopping bag drawer with item count.
- Mobile drawer navigation with responsive hamburger menu.

### 3. Dedicated Hydra Energy Deep-Dive Section
- Multi-angle visual gallery:
  - Original High-Resolution Flacon View
  - Interactive Olfactory Pyramid (Top, Heart, Base notes)
  - Optimal Pulse Points Application Guide
- Dynamic flacon size selector (50ml ₹449, 100ml ₹799, 150ml ₹1,099).
- Real-time stock counter and quantity stepper.
- Add to Cart and Instant Buy Now direct flow.
- **Delivery PIN Code Checker:** Validates 6-digit Indian PIN codes and computes realistic estimated delivery date, courier partner (BlueDart/Delhivery), and COD status.
- Technical specifications table (Concentration, Longevity, Sillage, Origin).

### 4. Fragrance Experience Section
Three premium feature cards representing the evolution of Hydra Energy:
- **FRESH ENERGY** — Italian Bergamot, Ocean Breeze, Aquatic Ozone (0 - 30 Mins).
- **BOLD CHARACTER** — French Lavender, Rosemary, Marine Flora (30 Mins - 3 Hours).
- **LASTING IMPRESSION** — Amberwood, Atlas Cedar, Indonesian Patchouli (3 - 10+ Hours).

### 5. Featured Fragrance Catalog (6 Fragrances)
- **Wild Stone Hydra Energy EDP** (Flagship Hero Product)
- **Wild Stone Edge EDP** (Woody & Citrus — Sample Product)
- **Wild Stone Forest Spice EDP** (Botanical Woods — Sample Product)
- **Wild Stone Night Rider EDP** (Dark Leather & Oud — Sample Product)
- **Wild Stone Titanium EDP** (Marine Citrus — Sample Product)
- **Wild Stone Ultra Sensual EDP** (Frost Mint & Musk — Sample Product)
- Category filters: *All*, *Fresh & Aquatic*, *Woody & Spicy*, *Citrus & Aromatic*.
- Sort dropdown: *Featured*, *Price: Low to High*, *Price: High to Low*, *Highest Rated*.
- Quick View modal, Wishlist toggle, and Add to Bag.
- Clearly marked sample placeholder indicators as requested.

### 6. Full Shopping Cart & Checkout Flow
- Slide-over cart drawer with free shipping progress bar (threshold ₹999).
- Promo code applicator with code `OCEAN20` (20% OFF).
- 3-Step Checkout Wizard:
  - Step 1: Customer shipping address & contact validation.
  - Step 2: Payment Gateway selection (Razorpay, UPI QR, Cash on Delivery).
  - Step 3: Order confirmation celebration screen with unique Order ID (`#WS-HYDRA-84920`).

### 7. Brand Story & Craftsmanship
- Headline: **MORE THAN A FRAGRANCE. IT'S YOUR SIGNATURE.**
- Highlights IFRA compliance, 100% French perfume oils, cruelty-free certification, and climate-calibrated longevity.

### 8. Customer Reviews & Interactive Submission
- Star rating breakdown (4.9 / 5.0 with rating distribution bars).
- Verified customer testimonials with helpfulness upvoting.
- **"Write a Review"** interactive modal with 5-star rating selector and live submission to state.

### 9. Client Concierge & Support
- Customer helpline, email concierge, and interactive contact form with instant submission feedback.

---

## 🚀 How to Run the Website

### Option 1: Using the PowerShell Web Server (Included)
Run the following in PowerShell from the project directory:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1 -Port 8080
```
Then open your browser to:
[http://localhost:8080](http://localhost:8080)

### Option 2: Opening Directly in Any Browser
You can also directly double-click or open `index.html` in Chrome, Edge, Safari, or Firefox via `file:///` protocol.

---

## 📂 Project Structure

```
blissful-bell/
├── css/
│   └── luxury-styles.css          # Custom animations, caustics, glassmorphism, fonts
├── images/
│   ├── wild-stone-hydra-energy.webp # Primary Hero Product Flacon (Preserved original)
│   ├── wild-stone-edge.jpg        # Secondary sample perfume visual
│   ├── wild-stone-forest-spice.jpg# Secondary sample perfume visual
│   ├── wild-stone-night-rider.jpg # Secondary sample perfume visual
│   ├── wild-stone-titanium.jpg    # Secondary sample perfume visual
│   └── wild-stone-ultra-sensual.jpg # Secondary sample perfume visual
├── index.html                     # Main luxury single-page React application
├── README.md                      # Documentation and project overview
└── server.ps1                     # Lightweight local HTTP server script
```

---

*Note: All trademarks and brand names are property of their respective owners. Sample product details, prices, and reviews are clearly marked development demonstration placeholders ready for backend integration.*
