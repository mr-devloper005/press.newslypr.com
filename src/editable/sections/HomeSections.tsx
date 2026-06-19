import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function recentPosts(posts: SitePost[], timeSections: HomeTimeSection[]) {
  const timed = timeSections.flatMap((section) => section.posts)
  return Array.from(new Map([...posts, ...timed].map((post) => [post.slug || post.id || post.title, post])).values())
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const allPosts = recentPosts(posts, timeSections)
  const lead = allPosts[0]
  const sidebar = allPosts.slice(1, 8)

  return (
    <section id="top" className="bg-[#f1f3f8]">
      <div className="bg-[#303030] text-white">
        <div className="funds-container flex min-h-[244px] flex-col items-center justify-center px-4 py-14 text-center">
          <h1 className="max-w-5xl text-3xl font-extrabold uppercase leading-tight tracking-[-0.02em] sm:text-4xl">
            {lead?.title || `${SITE_CONFIG.name} Media Updates`}
          </h1>
          <div className="mt-3 flex flex-wrap justify-center gap-2 text-sm font-bold">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Latest</span>
          </div>
        </div>
      </div>

      <div className="funds-container grid gap-8 py-10 lg:grid-cols-[minmax(0,878px)_360px]">
        <div className="min-w-0">
          {lead ? (
            <Link href={postHref(primaryTask, lead, primaryRoute)} className="funds-card group block overflow-hidden">
              <div className="relative min-h-[360px] bg-[#222]">
                <img src={getEditablePostImage(lead)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <span className="bg-[#2b82df] px-3 py-1 text-sm">{getEditableCategory(lead)}</span>
                  <h2 className="mt-5 text-4xl font-extrabold uppercase leading-tight">{lead.title}</h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">{getEditableExcerpt(lead, 190)}</p>
                </div>
              </div>
            </Link>
          ) : (
            <div className="funds-card p-10">
              <h2 className="text-3xl font-extrabold">Fresh media updates</h2>
              <p className="mt-3 text-[#555b63]">{SITE_CONFIG.description}</p>
            </div>
          )}
        </div>

        <HomeSidebar primaryTask={primaryTask} primaryRoute={primaryRoute} posts={sidebar} />
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items = recentPosts(posts, timeSections).slice(1, 7)
  if (!items.length) return null

  return (
    <section className="bg-[#f1f3f8]">
      <div className="funds-container grid gap-8 pb-10 lg:grid-cols-3">
        {items.map((post, index) => (
          <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className={index === 0 ? 'funds-card group block overflow-hidden lg:col-span-2' : 'funds-card group block overflow-hidden'}>
            {index === 0 ? <img src={getEditablePostImage(post)} alt="" className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" /> : null}
            <div className="p-7">
              <span className="inline-block bg-[#2b82df] px-3 py-1 text-sm text-white">{getEditableCategory(post)}</span>
              <h2 className="mt-5 text-2xl font-extrabold leading-tight group-hover:text-[#2b82df]">{post.title}</h2>
              <p className="mt-3 line-clamp-3 text-base leading-7 text-[#222a33]">{getEditableExcerpt(post, 155)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items = recentPosts(posts, timeSections).slice(7, 13)
  if (!items.length) return null

  return (
    <section className="bg-[#f1f3f8]">
      <div className="funds-container pb-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-extrabold text-[#343a42]">Market Briefing</h2>
          <Link href={primaryRoute} className="inline-flex items-center gap-2 bg-[#2b82df] px-4 py-3 text-sm font-bold text-white">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((post, index) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="funds-card group grid gap-5 p-6 sm:grid-cols-[130px_1fr]">
              <img src={getEditablePostImage(post)} alt="" className="h-32 w-full object-cover" />
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#2b82df]">Update {String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-xl font-extrabold leading-tight group-hover:text-[#2b82df]">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#555b63]">{getEditableExcerpt(post, 120)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items = recentPosts(posts, timeSections).slice(13, 21)
  if (!items.length) return null

  return (
    <section className="bg-[#f1f3f8]">
      <div className="funds-container pb-10">
        <div className="funds-card p-7">
          <h2 className="text-3xl font-extrabold text-[#343a42]">Latest Posts</h2>
          <div className="mt-4 grid gap-1">
            {items.map((post) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="border-t border-[#edf0f5] py-4 font-bold hover:text-[#2b82df]">
                {post.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[#f1f3f8]">
      <div className="funds-container pb-12">
        <form action="/search" className="funds-card grid gap-4 p-7 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-[#343a42]">Search the archive</h2>
            <p className="mt-2 text-sm text-[#555b63]">Find media releases, updates, and public announcements from the full collection.</p>
          </div>
          <label className="flex border border-[#e0e0e0] bg-white p-1 sm:min-w-[360px]">
            <Search className="ml-3 mt-3 h-4 w-4 text-[#2b82df]" />
            <input name="q" placeholder="Search" className="min-w-0 flex-1 px-3 py-2 outline-none" />
            <button className="bg-[#2b82df] px-4 text-sm font-bold text-white">Search</button>
          </label>
        </form>
      </div>
    </section>
  )
}

function HomeSidebar({ primaryTask, primaryRoute, posts }: { primaryTask: TaskKey; primaryRoute: string; posts: SitePost[] }) {
  return (
    <aside className="space-y-8">
      <div className="funds-card p-8">
        <h2 className="text-base font-normal">Search</h2>
        <form action="/search" className="mt-3 flex border border-[#e0e0e0] bg-white p-1">
          <input name="q" type="search" className="min-w-0 flex-1 px-3 py-2 outline-none" />
          <button className="bg-[#2b82df] px-4 text-sm font-bold text-white">Search</button>
        </form>
      </div>
      <div className="funds-card p-8">
        <h2 className="text-[34px] font-extrabold leading-tight text-[#3a3f45]">Recent Posts</h2>
        <div className="mt-6 grid gap-2 text-[16px] leading-6 text-[#4d4d4d]">
          {posts.length ? posts.map((post) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="hover:text-[#2b82df]">
              {post.title}
            </Link>
          )) : <p>No recent posts yet.</p>}
        </div>
      </div>
    </aside>
  )
}
