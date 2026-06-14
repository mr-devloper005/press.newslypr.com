import { mediaDistributionRoute } from '@/config/media-distribution-route'
import { slot4TaskSupport } from '@/editable/content/tasks.config'

export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Media Distribution',
    route: mediaDistributionRoute,
    description: 'Newsroom updates, announcements, press coverage, and distributed media posts.',
    contentType: 'mediaDistribution',
    enabled: slot4TaskSupport.mediaDistribution,
  },
  {
    key: 'listing',
    label: 'Business Listing',
    route: '/listing',
    description: 'Verified businesses and services.',
    contentType: 'listing',
    enabled: slot4TaskSupport.listing,
  },
  {
    key: 'classified',
    label: 'Classified',
    route: '/classified',
    description: 'Local offers, announcements, jobs, and deals.',
    contentType: 'classified',
    enabled: slot4TaskSupport.classified,
  },
  {
    key: 'article',
    label: 'Article',
    route: '/article',
    description: 'Insights, guides, blogs, and long-form content.',
    contentType: 'article',
    enabled: slot4TaskSupport.article,
  },
  {
    key: 'image',
    label: 'Image',
    route: '/image',
    description: 'Galleries and media-first posts.',
    contentType: 'image',
    enabled: slot4TaskSupport.image,
  },
  {
    key: 'profile',
    label: 'Profile',
    route: '/profile',
    description: 'Creator, author, and business profiles.',
    contentType: 'profile',
    enabled: slot4TaskSupport.profile,
  },
  {
    key: 'sbm',
    label: 'Social Bookmarking',
    route: '/sbm',
    description: 'Curated bookmarks and resources.',
    contentType: 'sbm',
    enabled: slot4TaskSupport.sbm,
  },
  {
    key: 'pdf',
    label: 'PDF',
    route: '/pdf',
    description: 'PDF resources and downloads.',
    contentType: 'pdf',
    enabled: slot4TaskSupport.pdf,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: mediaDistributionRoute,
  listing: '/listing',
  classified: '/classified',
  article: '/article',
  image: '/image',
  profile: '/profile',
  sbm: '/sbm',
  pdf: '/pdf',
} as const
