# Sympathetic Technology Landing

This folder is now a small multi-page website project (no framework). The landing page is `index.html`, and there’s a starter second page at `about.html`.

## Run locally

1. Install Node.js (includes `npm`).
2. From this folder:
   - `npm install`
   - `npm run dev`
3. Open the URL shown in your terminal.

## Build for production

- `npm run build`

The static output will be in `dist/`.

## Deploy to SiteGround

SiteGround can host static files. You have two simple options:

1. No-build (simplest): upload `index.html` and `about.html` to your site’s document root.
2. Build (recommended if you keep using the Vite setup): upload everything from `dist/` to your document root.

After uploading, ensure `index.html` ends up at the domain root (so `/` loads the landing page).

## Add more pages

Create another `*.html` file in this folder (for example, `contact.html`). `vite.config.js` automatically includes all root-level `.html` files (except `sympathetic_technology_hero_v3_1.html`).

