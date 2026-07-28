# Contributing

This is the personal portfolio of Sommay and Ramansh. Issues and suggestions are welcome;
please open an issue before a pull request so we can agree on the direction first.

## Setup

```bash
npm install
npm run dev
```

## Before you commit

```bash
npm run typecheck   # must pass
npm run lint        # must pass with zero warnings
npm run build       # must succeed
```

## Ground rules

1. **Never overstate the record.** Every project, milestone and achievement carries a `status`
   (`completed` / `ongoing` / `concept` / `planned`). Do not mark something completed until it is,
   and do not add an achievement that has not happened. This is the single most important rule in
   the repository.
2. **Content goes in `src/content/`**, never inline in a component.
3. **Server components by default.** Add `"use client"` only when state, effects or browser APIs
   are genuinely required, and say why in a comment if it is not obvious.
4. **Respect reduced motion.** Any new animation must check `usePrefersReducedMotion()` or be
   covered by the global media query in `globals.css`.
5. **Accessibility is not optional.** New interactive elements need a discernible name, visible
   focus, and keyboard operability.
6. **No new dependencies** without a clear reason. Framer Motion, three.js and Lucide already
   cover animation, 3D and icons.

## Commits

Conventional Commits, please:

```
feat: add autonomous navigation project
fix: correct timeline year for IIT Bombay
docs: expand asset checklist
perf: defer gallery lightbox mount
```

## Structure

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the component layers and the client/server
boundary, and [`docs/CONTENT.md`](docs/CONTENT.md) for how to add content.
