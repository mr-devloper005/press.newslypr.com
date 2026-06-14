import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { CompactIndexCard, getEditableExcerpt, getEditablePostImage, postHref, RailPostCard } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = posts[0]
  const side = posts.slice(1, 3)
  const trending = posts.slice(3, 8)
  const heroTitle = pagesContent.home.hero.title.join(' ') || `${SITE_CONFIG.name}: independent stories, culture, and perspective.`

  return (
    <section className="border-b border-black/20 bg-[var(--slot4-surface-bg)]">
      <div className={`${dc.shell.section} py-8 sm:py-10`}>
        {!lead ? (
          <div className="grid min-h-[520px] items-end bg-black p-8 text-white sm:p-12 lg:grid-cols-[1fr_.55fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[.24em] text-[var(--slot4-accent)]">{pagesContent.home.hero.badge}</p>
              <h1 className={`${dc.type.heroTitle} mt-5 max-w-5xl`}>{heroTitle}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{pagesContent.home.hero.description}</p>
              <Link href={primaryRoute} className={`${dc.button.accent} mt-8`}>Open newsroom <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-px bg-black/20 lg:grid-cols-[.72fr_1.48fr_.7fr]">
            <div className="grid gap-px bg-black/20">
              {side.map((post, index) => (
                <Link key={post.id} href={postHref(primaryTask, post, primaryRoute)} className="group relative min-h-[270px] overflow-hidden bg-black text-white">
                  <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_15%,rgba(0,0,0,.9))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10px] font-black uppercase tracking-[.18em] text-white/65">{index === 0 ? 'Spotlight' : 'Culture desk'}</p>
                    <h2 className="mt-2 text-2xl font-black leading-[1.02] tracking-[-.045em]">{post.title}</h2>
                  </div>
                </Link>
              ))}
            </div>

            <Link href={postHref(primaryTask, lead, primaryRoute)} className="group relative min-h-[541px] overflow-hidden bg-[var(--slot4-accent)] text-white">
              <img src={getEditablePostImage(lead)} alt={lead.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.84))]" />
              <div className="absolute inset-x-0 bottom-0 border-t-8 border-[var(--slot4-accent)] p-6 sm:p-9">
                <span className="bg-[var(--slot4-accent)] px-3 py-2 text-[10px] font-black uppercase tracking-[.2em]">Lead story</span>
                <h1 className="mt-5 text-4xl font-black leading-[.94] tracking-[-.06em] sm:text-6xl">{lead.title}</h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/82 sm:text-base">{getEditableExcerpt(lead, 180)}</p>
              </div>
            </Link>

            <aside className="bg-[var(--slot4-surface-bg)] p-6">
              <div className="flex items-end justify-between border-b-4 border-black pb-3">
                <h2 className="text-2xl font-black uppercase tracking-[-.04em]">Trending</h2>
                <span className="text-[10px] font-black uppercase tracking-[.2em] text-[var(--slot4-accent)]">Now</span>
              </div>
              <div className="mt-2">
                {trending.map((post, index) => <CompactIndexCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(5, 13).length ? posts.slice(5, 13) : posts
  if (!railPosts.length) return null
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="flex items-end justify-between gap-6 border-b-4 border-black pb-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.23em] text-[var(--slot4-accent)]">The daily edit</p>
            <h2 className="mt-2 text-4xl font-black tracking-[-.055em]">Latest stories</h2>
          </div>
          <Link href={primaryRoute} className="hidden text-xs font-black uppercase tracking-[.14em] hover:text-[var(--slot4-accent)] sm:inline-flex">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
        <div className={`${dc.layout.rail} mt-6`}>
          {railPosts.map((post, index) => <RailPostCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[8] || posts[0]
  const portraits = posts.slice(9, 14).length ? posts.slice(9, 14) : posts.slice(1, 6)
  if (!feature) return null
  return (
    <section className="bg-[var(--slot4-accent)] text-white">
      <div className={`${dc.shell.section} py-14 sm:py-20`}>
        <div className="flex items-end justify-between border-b border-white/50 pb-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.24em] text-white/70">Essential reading</p>
            <h2 className="mt-2 text-4xl font-black tracking-[-.055em] sm:text-5xl">Features</h2>
          </div>
          <span className="editorial-serif hidden text-2xl italic sm:block">Stories worth your time.</span>
        </div>
        <div className="mt-7 grid gap-5 lg:grid-cols-[1.55fr_.72fr_.72fr_.72fr]">
          <Link href={postHref(primaryTask, feature, primaryRoute)} className="group relative min-h-[520px] overflow-hidden bg-black lg:row-span-2">
            <img src={getEditablePostImage(feature)} alt={feature.title} className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.025]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(0,0,0,.88))]" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-white/70">Cover feature</p>
              <h3 className="mt-3 text-4xl font-black leading-[.98] tracking-[-.055em]">{feature.title}</h3>
            </div>
          </Link>
          {portraits.slice(0, 5).map((post) => (
            <Link key={post.id} href={postHref(primaryTask, post, primaryRoute)} className="group bg-black text-white">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,.88))]" />
                <h3 className="absolute inset-x-0 bottom-0 p-4 text-lg font-black leading-tight tracking-[-.035em]">{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collected = timeSections.flatMap((section) => section.posts)
  const source = collected.length ? collected : posts.slice(3)
  const lead = source[0] || posts[0]
  const briefs = source.slice(1, 7)
  if (!lead) return null
  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr]">
          <div>
            <div className="border-b-4 border-black pb-4">
              <p className="text-[10px] font-black uppercase tracking-[.23em] text-[var(--slot4-accent)]">From the newsroom</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-.055em]">More to discover</h2>
            </div>
            <Link href={postHref(primaryTask, lead, primaryRoute)} className="group mt-6 grid border-b border-black/20 pb-7 sm:grid-cols-[1.1fr_.9fr]">
              <div className="relative min-h-[330px] overflow-hidden bg-[var(--slot4-media-bg)]">
                <img src={getEditablePostImage(lead)} alt={lead.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="bg-black p-7 text-white sm:p-9">
                <p className="text-[10px] font-black uppercase tracking-[.2em] text-[var(--slot4-accent)]">Editor&apos;s pick</p>
                <h3 className="mt-4 text-4xl font-black leading-[.98] tracking-[-.055em]">{lead.title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/70">{getEditableExcerpt(lead, 180)}</p>
              </div>
            </Link>
          </div>
          <aside>
            <div className="border-b-4 border-black pb-4">
              <p className="text-[10px] font-black uppercase tracking-[.23em] text-[var(--slot4-accent)]">Quick reads</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-.055em]">The briefing</h2>
            </div>
            <div className="mt-2">
              {briefs.map((post, index) => <CompactIndexCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
          </aside>
        </div>
        <form action="/search" className="mt-14 grid border-y-4 border-black bg-[var(--slot4-page-bg)] p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-9">
          <div>
            <h3 className="text-3xl font-black tracking-[-.05em]">Search the full archive</h3>
            <p className="mt-2 text-sm text-black/60">Explore every {taskLabel(primaryTask).toLowerCase()} published by {SITE_CONFIG.name}.</p>
          </div>
          <label className="mt-5 flex border border-black bg-white sm:mt-0 sm:min-w-[420px]">
            <Search className="ml-4 mt-4 h-4 w-4" />
            <input name="q" placeholder="Search stories" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" />
            <button className="bg-[var(--slot4-accent)] px-5 text-xs font-black uppercase tracking-[.14em] text-white">Search</button>
          </label>
        </form>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-black text-white">
      <div className={`${dc.shell.section} grid gap-px bg-white/25 lg:grid-cols-2`}>
        <div className="bg-black px-6 py-14 sm:px-10 lg:py-20">
          <p className="text-[10px] font-black uppercase tracking-[.24em] text-[var(--slot4-accent)]">Stay informed</p>
          <h2 className="mt-4 max-w-xl text-5xl font-black leading-[.94] tracking-[-.06em]">The stories shaping what comes next.</h2>
        </div>
        <div className="flex flex-col justify-center bg-black px-6 py-14 sm:px-10 lg:py-20">
          <p className="max-w-xl text-lg leading-8 text-white/65">Fresh releases, media updates, newsroom perspectives, and useful public information in one focused publication.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className={dc.button.accent}>Send a tip</Link>
            <Link href="/signup" className="border border-white px-7 py-3.5 text-xs font-black uppercase tracking-[.12em] hover:bg-white hover:text-black">Join the readership</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
