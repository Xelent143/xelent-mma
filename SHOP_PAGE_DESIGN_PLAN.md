# Xelent MMA Shop Page Design Plan
## Research-Based UI/UX Strategy

Based on analysis of top BJJ/MMA brands (Shoyoroll, Tatami, Hayabusa, Venum, Sanabul) and e-commerce best practices for 2025.

---

## 1. LAYOUT ARCHITECTURE

### Desktop Layout (1200px+)
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (Navigation)                                        │
├─────────────────────────────────────────────────────────────┤
│  BREADCRUMBS: Home > Shop > BJJ Gi                         │
├─────────────────────────────────────────────────────────────┤
│  PAGE TITLE          │  SORT: Featured ▼   [GRID/LIST VIEW] │
│  "BJJ Gi Collection" │                                    │
├──────────┬──────────────────────────────────────────────────┤
│          │  ACTIVE FILTERS: [Black ✕] [A2 ✕] [Clear All]   │
│  FILTER  │                                                  │
│  SIDEBAR │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │
│          │  │PRODUCT │ │PRODUCT │ │PRODUCT │ │PRODUCT │    │
│  Category│  │ CARD 1 │ │ CARD 2 │ │ CARD 3 │ │ CARD 4 │    │
│  ├ Gi    │  └────────┘ └────────┘ └────────┘ └────────┘    │
│  ├ No-Gi │                                                  │
│  ├ Shorts│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │
│  └ Acc   │  │PRODUCT │ │PRODUCT │ │PRODUCT │ │PRODUCT │    │
│          │  │ CARD 5 │ │ CARD 6 │ │ CARD 7 │ │ CARD 8 │    │
│  Price   │  └────────┘ └────────┘ └────────┘ └────────┘    │
│  [Slider]│                                                  │
│          │  [LOAD MORE] or [PAGINATION: 1 2 3 ... 12]      │
│  Size    │                                                  │
│  [A0 □]  │                                                  │
│  [A1 □]  │                                                  │
│  [A2 □]  │                                                  │
│          │                                                  │
│  Color   │                                                  │
│  ⚫ ⚪ 🔵 │                                                  │
│          │                                                  │
│  Rating  │                                                  │
│  ★★★★★ □ │                                                  │
│          │                                                  │
│  [Clear] │                                                  │
│  Filters │                                                  │
└──────────┴──────────────────────────────────────────────────┘
```

### Mobile Layout (<768px)
```
┌─────────────────────────────┐
│  HEADER                     │
├─────────────────────────────┤
│  BREADCRUMBS                │
├─────────────────────────────┤
│  "BJJ Gi Collection"        │
│  24 products                │
├─────────────────────────────┤
│  [FILTER ▼]    [SORT ▼]     │  ← Sticky bottom bar
├─────────────────────────────┤
│  ┌─────────────┐            │
│  │             │            │
│  │   PRODUCT   │            │
│  │    CARD     │            │
│  │   (2-col)   │            │
│  │             │            │
│  └─────────────┘            │
│  ┌─────────────┐            │
│  │   PRODUCT   │            │
│  │    CARD     │            │
│  └─────────────┘            │
│                             │
│  [LOAD MORE]                │
└─────────────────────────────┘
```

---

## 2. FILTERING SYSTEM

### Filter Categories (Left Sidebar - Desktop)
Based on Baymard Institute research and BJJ-specific needs:

| Priority | Filter | Type | Default State |
|----------|--------|------|---------------|
| 1 | Category | Checkbox | Expanded |
| 2 | Size | Checkbox | **EXPANDED** (critical for BJJ) |
| 3 | Price | Range Slider | Expanded |
| 4 | Color | Swatches | Expanded |
| 5 | Gi Weight | Checkbox | Collapsed |
| 6 | Weave Type | Checkbox | Collapsed |
| 7 | Rating | Stars | Collapsed |

### Size Filter - CRITICAL
**Research Finding:** Size filter must be near top and expanded by default (Baymard). BJJ gis have specific sizing (A0-A5) that's different from regular clothing.

```
SIZE
┌─────────────────────────────┐
│ [All Sizes]                 │
│                             │
│ □ A0 (5'0"-5'4")           │
│ □ A1 (5'4"-5'8")           │
│ □ A2 (5'8"-6'0") ⭐ Popular │
│ □ A3 (6'0"-6'3")           │
│ □ A4 (6'3"-6'6")           │
│ □ A5 (6'6"+)               │
│                             │
│ [Size Guide →]              │
└─────────────────────────────┘
```

### Price Filter
```
PRICE
┌─────────────────────────────┐
│ $0 ———————●——————— $300     │
│                             │
│ Min: $50    Max: $200       │
│                             │
│ [Under $100]                │
│ [$100 - $150]               │
│ [$150 - $200]               │
│ [Over $200]                 │
└─────────────────────────────┘
```

### Color Filter (Visual Swatches)
```
COLOR
┌─────────────────────────────┐
│ ⚫ Black    (12)            │
│ ⚪ White    (8)             │
│ 🔵 Blue     (6)             │
│ 🟤 Navy     (4)             │
│ 🔴 Red      (3)             │
│ 🟡 Gold     (2)             │
│ 🟣 Purple   (1)             │
└─────────────────────────────┘
```

### Active Filters Display
```
┌────────────────────────────────────────────────────────┐
│ ACTIVE: [Black ✕] [A2 ✕] [Under $150 ✕] [Clear All]  │
└────────────────────────────────────────────────────────┘
```

---

## 3. PRODUCT GRID SPECIFICATIONS

### Grid Layout
- **Desktop:** 4 columns (minmax(280px, 1fr))
- **Tablet:** 2-3 columns
- **Mobile:** 2 columns (not 1 - research shows better engagement)

### Product Card Structure
```
┌─────────────────────────────┐ ← Card container
│ [NEW]              [-20%]   │ ← Badges (absolute positioned)
│                             │
│    ┌─────────────────┐      │
│    │                 │      │
│    │  PRODUCT IMAGE  │      │ ← 280px height, object-fit: cover
│    │                 │      │
│    │  [QUICK ADD]    │      │ ← Appears on hover
│    │                 │      │
│    └─────────────────┘      │
│                             │
│  BJJ GI                     │ ← Category (small, red)
│  Elite Pro Gi - Black       │ ← Product name (1-2 lines max)
│  ★★★★★ (128)                │ ← Rating
│  $149    ~~$189~~           │ ← Price + strikethrough sale
│                             │
│  ⚫ ⚪ 🔵 +2                 │ ← Color swatches (if applicable)
│                             │
│  [♡ Wishlist]               │
└─────────────────────────────┘
```

### Card Hover Effects
1. **Card lifts** 8px up with shadow
2. **Image zooms** 1.05x
3. **Quick Add button** slides up from bottom
4. **Border color** changes to brand red

### Product Badges
| Badge | Color | Use Case |
|-------|-------|----------|
| NEW | Gold #F59E0B | Products added < 30 days |
| SALE | Red #DC2626 | Discounted items |
| BESTSELLER | Gold outline | Top 10 selling |
| LIMITED | Black + Gold border | Low stock (< 10) |
| IBJJF | Blue | Competition approved |

---

## 4. SORTING OPTIONS

### Sort Dropdown
```
SORT BY: [Featured ▼]

Options:
├─ Featured (default)
├─ Best Selling
├─ Newest First
├─ Price: Low to High
├─ Price: High to Low
├─ Highest Rated
└─ Name: A-Z
```

### View Toggle
```
[GRID ▦]  [LIST ☰]
```

---

## 5. MOBILE-SPECIFIC DESIGN

### Mobile Filter Pattern
**Bottom Sheet Modal** (not sidebar)
```
┌─────────────────────────────┐
│  FILTERS          [✕]       │ ← Swipe down to close
├─────────────────────────────┤
│  Category                   │
│  [All ▼]                    │
├─────────────────────────────┤
│  Size (A2 selected)         │
│  [A0] [A1] [A2] [A3] [A4]   │
├─────────────────────────────┤
│  Price Range                │
│  $50 —————●————— $200       │
├─────────────────────────────┤
│  [SHOW 24 RESULTS]          │ ← Sticky button
└─────────────────────────────┘
```

### Sticky Elements (Mobile)
1. **Header** - Always visible
2. **Filter/Sort Bar** - Sticky below header
3. **View Toggle** - In filter bar
4. **"Load More"** - Bottom of list

### Touch Targets
- Minimum 44x44px for all interactive elements
- 8px spacing between filter chips
- Swipe gestures for product gallery

---

## 6. CONVERSION OPTIMIZATION FEATURES

### Quick View Modal
```
┌─────────────────────────────────────────┐
│  [×]                                    │
├──────────────────┬──────────────────────┤
│                  │  BJJ GI              │
│   PRODUCT        │  Elite Pro Gi        │
│   IMAGE          │  ★★★★★ (128 reviews) │
│   GALLERY        │                      │
│                  │  $149  ~~$189~~      │
│   [◀] [▶]        │  Save $40 (21% off)  │
│                  │                      │
│                  │  COLOR: ⚫ Black     │
│                  │  ⚪ 🔵 ⚫             │
│                  │                      │
│                  │  SIZE:               │
│                  │  [A0] [A1] [A2] [A3] │
│                  │                      │
│                  │  [ADD TO CART]       │
│                  │  [♡ Wishlist]        │
└──────────────────┴──────────────────────┘
```

### AJAX Filtering (No Page Reload)
- Results update instantly
- URL updates for shareable filtered views
- Loading skeleton during fetch
- Smooth transition animations

### Empty State
```
┌─────────────────────────────┐
│                             │
│     🔍                      │
│                             │
│  No products found          │
│                             │
│  Try adjusting your filters │
│                             │
│  [Clear All Filters]        │
│                             │
└─────────────────────────────┘
```

### Load More vs Pagination
**Recommendation: Load More button**
- Research shows better engagement for product discovery
- Button text: "Load More (24 of 156)"
- Auto-load on scroll (optional, with toggle)

---

## 7. SPECIFIC FEATURES FOR BJJ/MMA

### Gi-Specific Filters
```
GI WEIGHT
├─ Lightweight (350-450gsm)
├─ Medium (450-550gsm)
└─ Heavyweight (550gsm+)

WEAVE TYPE
├─ Pearl Weave
├─ Gold Weave
├─ Double Weave
└─ Single Weave

IBJJF APPROVED
└─ ☑ Competition Legal
```

### Rashguard-Specific Filters
```
SLEEVE LENGTH
├─ Long Sleeve
├─ Short Sleeve
└─ Sleeveless

COMPRESSION LEVEL
├─ Light
├─ Medium
└─ High
```

### Size Guide Integration
Every size filter includes:
- Height/weight recommendations
- Link to detailed size guide
- "Find my size" wizard

---

## 8. PERFORMANCE CONSIDERATIONS

### Image Loading
- Lazy loading for below-fold products
- WebP format with fallbacks
- Responsive images (srcset)
- Blur-up placeholder effect

### Product Count
- Load 24 products initially
- Load 12 more on "Load More"
- Maximum 150 products before pagination

### Filter Performance
- Debounced filter inputs (300ms)
- Caching of filter combinations
- Progressive loading of filter counts

---

## 9. ACCESSIBILITY

### Keyboard Navigation
- Tab through all filter options
- Space/Enter to toggle filters
- ESC to close mobile filter modal

### Screen Readers
- Announce filter changes
- Product count updates
- "Showing X of Y products"

### Color Contrast
- All text meets WCAG AA
- Filter states clearly distinguishable

---

## 10. COMPETITIVE ANALYSIS SUMMARY

| Feature | Shoyoroll | Tatami | Hayabusa | Venum | Sanabul | Xelent Plan |
|---------|-----------|--------|----------|-------|---------|-------------|
| Sidebar Filters | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Quick View | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ |
| Size Filter Top | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Grid View | 3-col | 4-col | 3-col | 4-col | 3-col | 4-col |
| AJAX Filtering | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ |
| Wishlist | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ |
| Product Badges | Minimal | Good | Good | Heavy | Minimal | Balanced |
| Mobile Filters | Bottom | Bottom | Bottom | Sidebar | Bottom | Bottom |

---

## IMPLEMENTATION CHECKLIST

### Phase 1: Core Functionality
- [ ] Product grid layout (responsive)
- [ ] Basic filtering (Category, Price, Size)
- [ ] Sorting dropdown
- [ ] Product cards with hover effects
- [ ] Mobile responsive layout

### Phase 2: Advanced Features
- [ ] AJAX filtering (no reload)
- [ ] Quick view modal
- [ ] Color swatches
- [ ] Active filter pills
- [ ] Size guide integration

### Phase 3: Optimization
- [ ] Lazy loading
- [ ] Image optimization
- [ ] Filter caching
- [ ] A/B test layout variations
- [ ] Analytics tracking

---

*Design Plan Created: March 18, 2026*
*Based on research from Baymard Institute, NNGroup, and top BJJ/MMA brands*
