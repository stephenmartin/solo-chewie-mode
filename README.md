# Chewie Mode

A custom Ghost theme based on [Solo](https://github.com/TryGhost/Solo) by the Ghost Foundation. Chewie Mode reimagines Solo with a bold, typographic aesthetic inspired by concert posters and hip-hop flyer design — specifically the book [Born in the Bronx](https://amzn.to/4rzGCdY).

## What changed from Solo

**Layout & Design**
- Concert poster-style homepage with headliner/support/feature/closer post hierarchy
- Day-of-week post background colors (configurable in admin)
- Tag pages with starburst (bang) SVG header
- Custom 404 error page in poster style
- "With Special Guests" projects section pulling pages by configurable tag
- Decorative SVG elements: bang starburst, little star, four dots

**Typography**
- Inter (headings), Source Serif 4 (body), IBM Plex Mono (meta/nav) via Google Fonts CDN
- Pure black (#000) color system — no charcoal, no softened grays
- Ghost Admin font picker support via `--gh-font-heading` / `--gh-font-body` fallback pattern

**Simplifications**
- Removed about section, parallax/typographic feed variants, author profile
- Removed pagination (posts_per_page: 999)
- Simplified post template to single header path
- Stripped unused custom settings and CSS (~500+ lines removed)

**Theme Settings (Admin > Design)**
- Navigation layout (logo left, center, stacked)
- Show/hide special guests section + configurable tag name
- 8 background colors: default + one per day of week

## Development

Built with Gulp/PostCSS. Requires [Node](https://nodejs.org/) and [Yarn](https://yarnpkg.com/).

```bash
# Install dependencies
yarn

# Watch mode with livereload
yarn dev

# One-time build
yarn build

# Package for upload
yarn zip
```

Source CSS lives in `/assets/css/`, compiled output in `/assets/built/`.

## Based on Solo

The core theme engine, shared assets (`@tryghost/shared-theme-assets`), build pipeline, and foundational template structure come from Solo. Chewie Mode is a design layer on top.

Original Solo theme: Copyright (c) 2013-2026 Ghost Foundation - Released under the [MIT license](LICENSE).
