# Media Distribution V2 Base Theme

Built from the Slot 4 fully editable architecture.

## Publishing contract

- Master Panel task: `mediaDistribution`
- Category support: dynamic; every non-empty Master Panel category is accepted
- Editable fallback categories: `src/editable/content/categories.config.ts`
- All visible UI remains inside `src/editable/**`

## Stable per-site routes

Each site gets one deterministic route based on `NEXT_PUBLIC_SITE_CODE`. It does not change between restarts. Override it with `NEXT_PUBLIC_MEDIA_DISTRIBUTION_ROUTE` when a specific route is required.

Supported routes:

- `/press`
- `/release`
- `/news`
- `/media`
- `/media-distribution`
- `/online-media`
- `/public-relation`
- `/media-network`
- `/press-release`
- `/directory-press`
- `/business`
- `/news-agency`

Every supported route includes both archive and `[slug]` detail pages. `/updates` remains available as a compatibility alias so existing links do not break.
