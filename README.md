# Xelent MMA / BJJ Website

Production source for the Xelent BJJ ecommerce website and raster garment customizer.

Live reference: https://xelent-bjj.saadi1990.chatgpt.site

## Local development

Requirements:

- Node.js 20 LTS or newer
- npm

```bash
npm ci
npm run dev
```

## Validation

The Sites packaging test expects a production build to exist:

```bash
npm run build
npm run test:sites
```

## Included

- React 19 and Vite 6 storefront
- Product, collection, search, bag, and customizer routes
- Raster customizers for BJJ gis, rashguards, and grappling shorts
- Gi front, back, and open-interior views with synchronized color groups
- Pearl-weave, ripstop, and cotton-twill material mapping
- Cloudflare/Sites-compatible worker and inquiry endpoint
- D1 schema, migration, and R2-aware inquiry storage contract
- Production brand, lifestyle, product, mask, stitch, texture, and control assets
- Project handoff and customizer specification in `docs/`

## Current commercial status

The storefront and custom-design inquiry system are implemented. The secure checkout control remains a frontend prototype; real payments, orders, inventory, taxes, delivery rates, customer accounts, refunds, and transactional email still need implementation before commercial launch.

Read `AGENTS.md`, `docs/PROJECT_HANDOFF.md`, and `docs/CUSTOMIZER_SPEC.md` before making changes.
