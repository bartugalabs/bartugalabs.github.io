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
