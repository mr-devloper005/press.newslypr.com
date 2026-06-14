import { mediaDistributionCategories } from '@/editable/content/categories.config'

export const CATEGORY_OPTIONS: Array<{ name: string; slug: string }> = [
  ...mediaDistributionCategories.defaults,
]

const slugifyCategory = (value: string) => value
  .trim()
  .toLowerCase()
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

const allowed = new Set(CATEGORY_OPTIONS.flatMap((item) => [item.slug.toLowerCase(), item.name.toLowerCase()]))

export const isValidCategory = (value: string) => {
  const normalized = value.trim().toLowerCase()
  if (!normalized) return false
  return mediaDistributionCategories.allowAnyCategoryFromMasterPanel || allowed.has(normalized)
}

export const normalizeCategory = (value: string) => {
  const normalized = value.trim().toLowerCase()
  const match = CATEGORY_OPTIONS.find((item) => item.slug.toLowerCase() === normalized || item.name.toLowerCase() === normalized)
  return match?.slug || slugifyCategory(value)
}

export const getCategoryLabel = (value: string) => {
  const normalized = normalizeCategory(value)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || value.trim() || 'Uncategorised'
}
