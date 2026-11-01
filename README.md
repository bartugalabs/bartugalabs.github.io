# Bartuga

Minimal landing page for [bartugalabs.github.io](https://bartugalabs.github.io), built with
[Astro](https://astro.build).

## Development

```sh
npm install
npm run dev      # starts the dev server in the background
npm run build    # builds the site to ./dist/
npm run preview  # previews the production build
```

When using the background dev server: `astro dev stop`, `astro dev status`, `astro dev logs`.

## Deployment

Pushes to `main` or `landing` build and deploy `dist/` to GitHub Pages via
`.github/workflows/deploy.yml`.

One-time setup: in the repository settings, set **Pages → Source** to **GitHub Actions**.

## Search indexing

The site is intentionally excluded from search engines: `public/robots.txt` disallows all
crawlers and the layout sets `noindex, nofollow` meta tags.
