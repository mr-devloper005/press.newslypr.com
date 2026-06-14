import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'studio',
  hero: {
    variant: 'gallery-mosaic',
    eyebrow: 'Premium multi-surface publishing system',
  },
  home: {
    layout: 'editorial-rhythm',
    primaryTask: 'mediaDistribution',
    featuredTaskKeys: ['mediaDistribution'],
  },
  navigation: {
    variant: 'capsule',
  },
  footer: {
    variant: 'dense',
  },
  cards: {
    listing: 'studio-panel',
    article: 'editorial-feature',
    mediaDistribution: 'editorial-feature',
    image: 'studio-panel',
    profile: 'studio-panel',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'editorial-feature',
  },
})
