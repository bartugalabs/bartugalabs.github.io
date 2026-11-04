# Bartuga

Minimal landing page for [bartugalabs.github.io](https://bartugalabs.github.io), built with
[Astro](https://astro.build).

## Europe hero visual

The hero map geometry is generated from Natural Earth 1:50m admin-0 country data
([public domain](https://www.naturalearthdata.com/about/terms-of-use/)), packaged by
[`world-atlas`](https://github.com/topojson/world-atlas) and simplified with
[`topojson-simplify`](https://github.com/topojson/topojson-simplify). Regenerate it with:

```sh
node scripts/generate-europe-map.mjs
```

The generated `src/data/europe.ts` is committed, so builds do not need the data package.

## Images

Source artwork lives in `src/assets/` so Astro's `<Image />` component can resize and
re-encode it at build time. Files that must keep a fixed public URL (favicons, the web
manifest, the social card) stay in `public/`.

`public/og-image.png` and `public/apple-touch-icon.png` are generated from the artwork in
`src/assets/` plus the copy in `src/data/site.ts`. Regenerate them after changing the hero
copy or the logo:

```sh
node scripts/generate-images.mjs
```

The script downloads the brand fonts on first run and caches them in
`node_modules/.cache/bartuga-fonts`. Both outputs are committed, so builds need neither
the script nor the network.
