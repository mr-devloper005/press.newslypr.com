import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search, SlidersHorizontal } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const category = compactRaw(getContent(post).category) || post.tags?.[0] || taskLabel
  const strong = index % 6 === 0

  return (
    <Link href={href} className={`funds-card group block overflow-hidden transition hover:-translate-y-1 hover:shadow-lg ${strong ? 'lg:col-span-2' : ''}`}>
      {image ? (
        <div className={`relative overflow-hidden bg-[#303030] ${strong ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute left-4 top-4 bg-[#2b82df] px-3 py-1 text-sm text-white">{taskLabel}</span>
        </div>
      ) : null}
      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          {!image ? <span className="bg-[#2b82df] px-3 py-1 text-sm text-white">{taskLabel}</span> : null}
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#8b929d]">{category}</span>
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#8b929d]">Result {String(index + 1).padStart(2, '0')}</span>
        </div>
        <h2 className="mt-4 line-clamp-3 text-2xl font-extrabold leading-tight text-[#222a33] group-hover:text-[#2b82df]">{post.title}</h2>
        {summary ? <p className="mt-3 line-clamp-3 text-base leading-7 text-[#555b63]">{summary}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2b82df]">Open result <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)
  const mediaRoute = SITE_CONFIG.taskViews.mediaDistribution || SITE_CONFIG.tasks.find((item) => item.key === 'mediaDistribution')?.route || '/'
  const resultTitle = query ? `Results for "${query}"` : pagesContent.search.resultsTitle

  return (
    <EditableSiteShell>
      <main id="top" className="min-h-screen bg-[#f1f3f8] text-[#222a33]">
        <section className="bg-[#303030] text-white">
          <div className="funds-container flex min-h-[244px] flex-col items-center justify-center px-4 py-14 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8fdddf]">{pagesContent.search.hero.badge}</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-extrabold uppercase leading-tight tracking-[-0.02em] sm:text-5xl">
              {pagesContent.search.hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{pagesContent.search.hero.description}</p>
          </div>
        </section>

        <section className="funds-container py-10">
          <form action="/search" className="funds-card grid gap-5 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
            <input type="hidden" name="master" value="1" />
            <div className="grid gap-4">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[#3a3f45]"><Search className="h-4 w-4 text-[#2b82df]" /> Search keywords</span>
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="h-12 w-full border border-[#dfe4ec] bg-white px-4 text-base outline-none focus:border-[#2b82df]" />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[#3a3f45]"><Filter className="h-4 w-4 text-[#2b82df]" /> Category</span>
                  <input name="category" defaultValue={category} placeholder="Business, market, jobs..." className="h-12 w-full border border-[#dfe4ec] bg-white px-4 text-sm outline-none focus:border-[#2b82df]" />
                </label>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[#3a3f45]"><SlidersHorizontal className="h-4 w-4 text-[#2b82df]" /> Content type</span>
                  <select name="task" defaultValue={task} className="h-12 w-full border border-[#dfe4ec] bg-white px-4 text-sm font-bold outline-none focus:border-[#2b82df]">
                    <option value="">All content types</option>
                    {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                  </select>
                </label>
              </div>
            </div>
            <button className="inline-flex h-12 items-center justify-center bg-[#2b82df] px-6 text-sm font-bold text-white transition hover:bg-[#1874d6]" type="submit">
              Search
            </button>
          </form>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8b929d]">{results.length} results</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#343a42] sm:text-4xl">{resultTitle}</h2>
            </div>
            <Link href={mediaRoute} className="inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-bold text-[#2b82df] ring-1 ring-[#dfe4ec] transition hover:bg-[#2b82df] hover:text-white">
              Browse latest <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {results.length ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="funds-card mt-6 border-dashed p-12 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center bg-[#eaf4ff] text-[#2b82df]">
                <Search className="h-7 w-7" />
              </div>
              <p className="mt-5 text-3xl font-extrabold tracking-[-0.03em]">No matching posts found.</p>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#555b63]">Try a different keyword, content type, or category. The archive updates automatically as new media posts are published.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
