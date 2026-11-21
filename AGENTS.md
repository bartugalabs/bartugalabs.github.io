# Bartuga — website

Static marketing site for Bartuga Labs s.r.o. (cybersecurity, pentesting,
AI agent security and geointelligence). Live at https://bartuga.com.

## Stack

- Astro 7 static site, TypeScript strict, no UI framework, no database, no SSR.
- Pages: `/` (single landing page), `/privacy-policy`, `/404`.
- Deployed to GitHub Pages by `.github/workflows/deploy.yml` on push to `main`.
  Node is pinned in `.node-version`; no manual deploy step.

## Commands

```sh
npm install
npm run dev          # or: astro dev --background
astro dev status     # also: astro dev logs, astro dev stop
npm run build
npm run preview
```

Regenerate committed artifacts only when their inputs change:

```sh
node scripts/generate-europe-map.mjs   # src/data/europe.ts (hero map)
node scripts/generate-images.mjs       # og-image.png, apple-touch-icon.png
```

`generate-images.mjs` downloads brand fonts on first run and caches them in
`node_modules/.cache/bartuga-fonts`. Builds must never need the network.

## Architecture

- `src/pages/index.astro` composes the page from section components, in order:
  Hero, Principles, Cybersecurity, Pentesting, Geointelligence,
  AgentSecurity, Contact.
- All marketing copy, nav items and contact details live in `src/data/site.ts`
  (the `site` object, typed with `satisfies`). Edit content there, not in
  components.
- Components in `src/components/` are presentational. Shared styles live in
  `src/styles/global.css`; reuse `.section`, `.section-head`, `.grid`, `.card`,
  `.checklist`, `.pills`, `.split`, `.steps`, `.note` and `.link-row` before
  adding CSS.
- `src/layouts/Layout.astro` owns head metadata, JSON-LD, fonts, the privacy
  notice and the reveal-on-scroll observer.
- Images that Astro should optimise go in `src/assets/` and use `astro:assets`.
  `public/` is only for fixed URLs (favicons, manifest, social card, CNAME).

## Adding or changing a section

1. Add a typed content object to `site` in `src/data/site.ts`.
2. Add a nav item to `site.nav` before Contact. Header, mobile menu and footer
   all derive from it.
3. Create a component using the existing pattern:
   `<section class="section" id="..." aria-labelledby="...-title" tabindex="-1">`
   with `SectionHeading`, then the shared grid/card/checklist classes.
4. Render it in `src/pages/index.astro` in the intended order.
5. If the service offering changes, update `site.description`, the homepage
   `ItemList` JSON-LD and `knowsAbout` in `Layout.astro`.
6. Run `npm run build` and check: header at 861–1000px, mobile menu, anchor
   offset under the sticky header, and reduced-motion behaviour.

## Conventions

- Copy is en-GB, direct and concrete; avoid hype.
- Match existing style: tabs, single quotes, semicolons.
- Accessibility target is WCAG 2.2 AA. Keep landmarks, the skip link,
  `aria-labelledby` on sections, visible focus styles and reduced-motion
  handling.
- No third-party scripts, externally loaded fonts or analytics. The only
  external embed is the OpenStreetMap iframe in Contact. The CSP in
  `astro.config.mjs` allows self-hosted resources only; keep it that way.
- External links use `rel="noopener noreferrer"`.
- Do not edit generated or ignored paths: `dist/`, `.astro/`,
  `node_modules/`, `mycontent/`, `*.nogit.*`.

## Documentation

- https://docs.astro.build/en/guides/routing/
- https://docs.astro.build/en/basics/astro-components/
- https://docs.astro.build/en/guides/styling/
- https://docs.astro.build/en/guides/images/
