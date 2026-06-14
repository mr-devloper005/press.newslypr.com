import { siteIdentity } from '@/config/site.identity'

export const MEDIA_DISTRIBUTION_ROUTE_POOL = [
  '/press',
  '/release',
  '/news',
  '/media',
  '/media-distribution',
  '/online-media',
  '/public-relation',
  '/media-network',
  '/press-release',
  '/directory-press',
  '/business',
  '/news-agency',
] as const

const normalizeRoute = (value?: string) => {
  if (!value?.trim()) return null
  const route = `/${value.trim().replace(/^\/+|\/+$/g, '')}`
  return MEDIA_DISTRIBUTION_ROUTE_POOL.includes(route as (typeof MEDIA_DISTRIBUTION_ROUTE_POOL)[number])
    ? route
    : null
}

const stableHash = (value: string) => {
  let hash = 2166136261
  for (const character of value.toLowerCase()) {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export const mediaDistributionRoute =
  normalizeRoute(process.env.NEXT_PUBLIC_MEDIA_DISTRIBUTION_ROUTE) ||
  MEDIA_DISTRIBUTION_ROUTE_POOL[stableHash(siteIdentity.code || siteIdentity.domain) % MEDIA_DISTRIBUTION_ROUTE_POOL.length]
