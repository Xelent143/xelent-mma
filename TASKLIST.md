# Xelent MMA Website Development - Parallel Agent Task List

Based on competitor research of 15 top BJJ/MMA brands (Shoyoroll, Tatami, Hayabusa, Venum, Sanabul, Gameness, Fuji, Kingz, Scramble, Progress, Moya, Ctrl, Gold BJJ, Elite Sports, Hypnotik)

---

## PHASE 1: FOUNDATION & ARCHITECTURE

### Agent 1: Technical Setup & Performance
**Task:** Infrastructure and performance optimization
- [ ] Set up GitHub Actions for CI/CD
- [ ] Configure Cloudflare CDN with proper caching rules
- [ ] Implement lazy loading for all images
- [ ] Add WebP/AVIF image formats with fallbacks
- [ ] Configure preloading for critical resources (hero image, fonts)
- [ ] Set up Core Web Vitals monitoring (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Implement service worker for offline functionality
- [ ] Add schema markup (Organization, Product, LocalBusiness, FAQ)
- [ ] Create robots.txt and sitemap.xml
- [ ] Set up Google Analytics 4 + Google Search Console

**Output:** `/root/.openclaw/workspace/xelent-mma/technical/`

---

### Agent 2: SEO & GEO Foundation
**Task:** Search engine optimization for traditional + AI search
- [ ] Keyword research and mapping (BJJ gi, rashguards, fight shorts, MMA gear Pakistan)
- [ ] Write meta titles/descriptions for all pages (< 60/160 chars)
- [ ] Implement E-E-A-T signals (author bios, credentials, about page)
- [ ] Create FAQ schema with 20+ questions targeting voice search
- [ ] Write structured data for products (price, availability, reviews)
- [ ] Create comparison content (Xelent vs competitors)
- [ ] Write "People Also Ask" content sections
- [ ] Optimize for featured snippets (direct answers in first 100 words)
- [ ] Create entity relationships (link to BJJ, MMA, Pakistan manufacturing entities)
- [ ] Set up local SEO (Sialkot, Pakistan location signals)

**Output:** `/root/.openclaw/workspace/xelent-mma/seo/`

---

### Agent 3: Design System & Component Library
**Task:** Create reusable component library with brand guidelines
- [ ] Define color palette (Black #000000, Red #DC2626, Gold #F59E0B)
- [ ] Typography scale (Oswald headers, Inter body)
- [ ] Spacing system (8px base grid)
- [ ] Button components (primary, secondary, ghost, magnetic hover)
- [ ] Card components (product, testimonial, category)
- [ ] Form components (inputs, selects, checkboxes with validation)
- [ ] Navigation components (desktop mega-menu, mobile bottom bar)
- [ ] Badge components (New, Sale, Bestseller, Limited Edition)
- [ ] Animation tokens (durations, easings, stagger delays)
- [ ] Create CSS custom properties file

**Output:** `/root/.openclaw/workspace/xelent-mma/design-system/`

---

## PHASE 2: CORE PAGES

### Agent 4: Homepage (Hero + Social Proof)
**Task:** High-converting homepage based on competitor analysis
- [ ] Full-screen hero with fighter-1.png background
- [ ] Animated text reveal: "Born in Sialkot. Trusted Worldwide."
- [ ] Trust badges row (Free Shipping $100+, IBJJF Approved, 6+ Years)
- [ ] Primary CTA: "Shop Bestsellers" + Secondary: "Watch Our Story"
- [ ] Social proof section (15K+ athletes, 50+ countries, 4.9 rating)
- [ ] Logo marquee (gym/academy partners)
- [ ] Instagram feed integration (6 latest posts)
- [ ] Scroll-triggered parallax effects
- [ ] Mobile-responsive hero (vertical image crop)

**Output:** `/root/.openclaw/workspace/xelent-mma/index.html` (hero section)

---

### Agent 5: Product Showcase & Categories
**Task:** Interactive category and product sections
- [ ] Category cards with hover-expand (BJJ Gi, No-Gi, Fight Shorts, Accessories)
- [ ] Horizontal scroll carousel for "Trending Now" products
- [ ] Product cards with:
  - 3D tilt effect on hover
  - Quick-add button with size selector popup
  - Image zoom on hover
  - Badges (New, Bestseller, Sale -20%)
  - Star ratings with review count
  - Price with strikethrough for sales
- [ ] Staggered fade-in animations on scroll
- [ ] Swipe gestures for mobile carousel
- [ ] Skeleton loading states

**Output:** `/root/.openclaw/workspace/xelent-mma/index.html` (products section)

---

### Agent 6: Brand Story & Trust Section
**Task:** "Made in Sialkot" storytelling section
- [ ] Factory imagery with parallax scrolling
- [ ] Animated counters (50K+ gis sold, 40+ countries, 6+ years)
- [ ] Craftsmanship video embed
- [ ] Pakistan manufacturing heritage narrative
- [ ] Quality promise statement
- [ ] IBJJF approval certification display
- [ ] Map visualization with country pins
- [ ] Timeline of company milestones
- [ ] Team/artisan photos

**Output:** `/root/.openclaw/workspace/xelent-mma/index.html` (brand story section)

---

### Agent 7: Testimonials & Social Proof
**Task:** Comprehensive testimonials section
- [ ] 3-column testimonial cards with star ratings
- [ ] Athlete endorsement carousel with photos
- [ ] Academy partner logos grid
- [ ] Review count display ("Join 50,000+ fighters")
- [ ] Video testimonial integration
- [ ] Before/after transformation stories
- [ ] Trust badges (Secure checkout, Fast shipping, Money-back guarantee)
- [ ] Press mentions section
- [ ] User-generated content gallery

**Output:** `/root/.openclaw/workspace/xelent-mma/index.html` (testimonials section)

---

### Agent 8: Shop Page with Filters
**Task:** Full shop page with advanced filtering
- [ ] Product grid with pagination/infinite scroll
- [ ] Filter sidebar (Category, Price, Size, Color, Rating)
- [ ] Sort dropdown (Featured, Price Low-High, Newest, Best Rated)
- [ ] Active filter tags with remove button
- [ ] Product comparison feature
- [ ] Wishlist functionality
- [ ] Recently viewed section
- [ ] Mobile filter bottom sheet (not sidebar)
- [ ] URL parameters for filter state

**Output:** `/root/.openclaw/workspace/xelent-mma/shop.html`

---

### Agent 9: Product Detail Page
**Task:** High-converting PDP based on Hayabusa/Venum patterns
- [ ] Image gallery with zoom and 360° rotation
- [ ] Color swatches with image swap
- [ ] Size selector with fit guide popup
- [ ] Stock status indicator
- [ ] Price with savings calculation
- [ ] Add to cart with quantity selector
- [ ] Product tabs (Description, Specs, Reviews, Shipping)
- [ ] Technical specifications table (weight, fabric, stitching)
- [ ] Related products carousel
- [ ] Frequently bought together bundle
- [ ] Size guide wizard (height/weight → size recommendation)

**Output:** `/root/.openclaw/workspace/xelent-mma/product.html`

---

### Agent 10: Cart & Checkout Flow
**Task:** Optimized checkout (gameness.com style)
- [ ] Cart sidebar (not page) with item images
- [ ] Quantity controls with instant update
- [ ] Promo code input with validation
- [ ] Free shipping progress bar
- [ ] Saved for later section
- [ ] Multi-step checkout:
  - Step 1: Information (email, shipping address)
  - Step 2: Shipping method selection
  - Step 3: Payment (JazzCash, EasyPaisa, Credit Card icons)
  - Step 4: Review & Confirm
- [ ] Order summary sticky sidebar
- [ ] Guest checkout option
- [ ] Address autocomplete

**Output:** `/root/.openclaw/workspace/xelent-mma/cart.html`, `checkout.html`

---

### Agent 11: Content Pages (About, Contact, FAQ)
**Task:** Informational pages with SEO focus
- [ ] About page with company story video
- [ ] Contact page with form + WhatsApp integration
- [ ] FAQ page with accordion + FAQ schema
- [ ] Size guide page with measurement diagrams
- [ ] Shipping & Returns policy
- [ ] Wholesale/Bulk orders page (academy program)
- [ ] Affiliate program page
- [ ] Blog listing page (for SEO content)

**Output:** `/root/.openclaw/workspace/xelent-mma/about.html`, `contact.html`, `faq.html`, `size-guide.html`

---

## PHASE 3: ANIMATIONS & INTERACTIONS

### Agent 12: Micro-Interactions
**Task:** Polish animations throughout
- [ ] Magnetic buttons (cursor attraction within 50px)
- [ ] Hover lift effects (cards raise 4px with shadow)
- [ ] Loading states (skeleton screens)
- [ ] Success animations (checkmark draws on add to cart)
- [ ] Button ripple effects
- [ ] Input focus animations
- [ ] Toast notifications system
- [ ] Page transition animations
- [ ] Cursor follower glow (custom cursor)

**Output:** `/root/.openclaw/workspace/xelent-mma/js/animations.js`

---

### Agent 13: Scroll Animations
**Task:** Scroll-triggered effects
- [ ] Fade-up reveal on scroll (Intersection Observer)
- [ ] Parallax layers (background slower than foreground)
- [ ] Progress indicator bar at top
- [ ] Counter animations (numbers roll up when visible)
- [ ] Sticky navigation with hide/show on scroll
- [ ] Image reveal masks
- [ ] Text scramble effects on headlines
- [ ] Particle overlay (subtle dust/fiber floating)

**Output:** `/root/.openclaw/workspace/xelent-mma/js/scroll-effects.js`

---

## PHASE 4: E-COMMERCE FUNCTIONALITY

### Agent 14: Cart State Management
**Task:** JavaScript cart functionality
- [ ] Add to cart with localStorage persistence
- [ ] Cart count badge updates
- [ ] Mini-cart dropdown/sidebar
- [ ] Remove item functionality
- [ ] Update quantity with price recalculation
- [ ] Cart total calculation with shipping
- [ ] Save cart to session
- [ ] Abandoned cart recovery hooks

**Output:** `/root/.openclaw/workspace/xelent-mma/js/cart.js`

---

### Agent 15: WhatsApp Integration
**Task:** WhatsApp commerce features
- [ ] WhatsApp button (floating + footer)
- [ ] Pre-filled order messages
- [ ] WhatsApp catalog integration
- [ ] Click-to-chat on product pages
- [ ] Order tracking via WhatsApp
- [ ] Support chatbot integration

**Output:** `/root/.openclaw/workspace/xelent-mma/js/whatsapp.js`

---

## PHASE 5: CONTENT & ASSETS

### Agent 16: Product Photography
**Task:** Generate all product images using Gemini
- [ ] BJJ Gi in 4 colors (Black, White, Blue, Navy) - front/back
- [ ] Rashguards (long sleeve, short sleeve) - 3 designs
- [ ] Fight shorts - 3 styles
- [ ] Accessories (hand wraps, belts, bags)
- [ ] Lifestyle images (athletes training)
- [ ] Factory/process images
- [ ] Team/artist photos
- [ ] Banner/hero images for each category

**Output:** `/root/.openclaw/workspace/xelent-mma/images/products/`

---

### Agent 17: Copywriting
**Task:** All website copy based on competitor voice analysis
- [ ] Homepage headlines and CTAs
- [ ] Product descriptions (technical + benefits)
- [ ] About page story
- [ ] Email capture copy (10% off value proposition)
- [ ] Checkout abandonment emails
- [ ] FAQ answers (conversational tone)
- [ ] Meta descriptions for all pages
- [ ] Social proof testimonials (15+ reviews)

**Output:** `/root/.openclaw/workspace/xelent-mma/content/copy.md`

---

### Agent 18: Blog Content (SEO)
**Task:** 10 blog posts for organic traffic
- [ ] "How to Choose Your First BJJ Gi"
- [ ] "BJJ Gi Care Guide: Make It Last 5+ Years"
- [ ] "Rashguard vs T-Shirt: Why Every Grappler Needs One"
- [ ] "Made in Sialkot: The Hidden Hub of Fightwear"
- [ ] "IBJJF Rules: What Gi Colors Are Legal?"
- [ ] "Best MMA Gear for Beginners (2025 Guide)"
- [ ] "How to Start an MMA Gym in Pakistan"
- [ ] "Xelent vs Venum: Honest Comparison"
- [ ] "What Belt Color Means in BJJ"
- [ ] "Training in Pakistan Heat: Gear That Breathes"

**Output:** `/root/.openclaw/workspace/xelent-mma/blog/`

---

## PHASE 6: TESTING & OPTIMIZATION

### Agent 19: Testing & QA
**Task:** Quality assurance across devices
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsive testing (iPhone, Android)
- [ ] Performance audit (Lighthouse 90+ score)
- [ ] Accessibility audit (WCAG 2.1 AA compliance)
- [ ] Form validation testing
- [ ] Checkout flow testing
- [ ] Cart functionality testing
- [ ] Link checking (no 404s)
- [ ] Image optimization verification
- [ ] SSL/HTTPS setup verification

**Output:** `/root/.openclaw/workspace/xelent-mma/qa-report.md`

---

### Agent 20: A/B Testing Setup
**Task:** Prepare tests for optimization
- [ ] Hero CTA test: "Shop Now" vs "Shop Bestsellers" vs "Explore Collection"
- [ ] Social proof placement: Above fold vs below products
- [ ] Video vs static hero background
- [ ] Category layout: Grid vs horizontal scroll
- [ ] Trust badges: Which increase conversion most
- [ ] Checkout: Single page vs multi-step
- [ ] Product cards: With/without quick-add
- [ ] Email capture: Popup vs inline vs exit intent

**Output:** `/root/.openclaw/workspace/xelent-mma/ab-tests.md`

---

## EXECUTION ORDER

### Wave 1 (Foundation - Parallel)
- Agent 1: Technical Setup
- Agent 2: SEO Foundation  
- Agent 3: Design System

### Wave 2 (Core Pages - Parallel)
- Agent 4: Homepage Hero
- Agent 5: Product Showcase
- Agent 6: Brand Story
- Agent 7: Testimonials

### Wave 3 (E-commerce - Parallel)
- Agent 8: Shop Page
- Agent 9: Product Detail
- Agent 10: Cart & Checkout
- Agent 11: Content Pages

### Wave 4 (Polish - Parallel)
- Agent 12: Micro-Interactions
- Agent 13: Scroll Animations
- Agent 14: Cart State
- Agent 15: WhatsApp Integration

### Wave 5 (Content - Parallel)
- Agent 16: Product Images
- Agent 17: Copywriting
- Agent 18: Blog Content

### Wave 6 (Launch)
- Agent 19: Testing
- Agent 20: A/B Testing Setup

---

## SUCCESS METRICS

- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse Accessibility: 95+
- [ ] Lighthouse SEO: 95+
- [ ] Core Web Vitals: All green
- [ ] Mobile usability: 100%
- [ ] Page load time: < 3 seconds
- [ ] Cart functionality: 100% working
- [ ] Cross-browser: All modern browsers
- [ ] SEO keywords ranking: Top 10 for 10 keywords within 3 months

---

## COMPETITOR FEATURES TO EMULATE

| Brand | Feature to Copy |
|-------|----------------|
| Shoyoroll | Limited drop countdown timers |
| Tatami | Artist collaboration showcases |
| Hayabusa | Technical specifications tables |
| Venum | Athlete endorsement prominence |
| Sanabul | Clear price positioning |
| Gameness | Academy partnership program |
| Kingz | Competition pedigree focus |
| Scramble | Streetwear/lifestyle crossover |
| Gold BJJ | Strong guarantee messaging |
| Moya | Heavy lifestyle photography |

---

*Task list created from analysis of 15 top BJJ/MMA brands*
*Last updated: March 18, 2026*
