import type { SiteFactoryRecipe } from '@/design/factory/types'

export const SITE_FACTORY_RECIPE: SiteFactoryRecipe = {
  brandPack: 'mediaDistribution',
  navbar: 'compact-bar',
  footer: 'editorial-footer',
  homeLayout: 'article-home',
  motionPack: 'editorial-soft',
  primaryTask: 'mediaDistribution',
  enabledTasks: ['mediaDistribution'],
  taskLayouts: {
    mediaDistribution: 'article-editorial',
  },
}
