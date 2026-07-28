# Gallery images

Drop optimised images here (`.webp` or `.avif`, max ~1600px on the long edge),
then reference them from `src/content/gallery.ts`:

```ts
{ id: "g1", ..., src: "/gallery/robo-car-build.webp", placeholder: false }
```

Until an item has a `src`, the site renders generated placeholder artwork and
labels it as a placeholder. See `docs/ASSETS-NEEDED.md`.
