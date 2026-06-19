import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  const mediaRoute = SITE_CONFIG.taskViews.mediaDistribution || SITE_CONFIG.tasks.find((task) => task.key === 'mediaDistribution')?.route || '/search'

  return (
    <EditableSiteShell>
      <main id="top" className="min-h-screen bg-[#f1f3f8] text-[#222a33]">
        <section className="bg-[#303030] text-white">
          <div className="funds-container flex min-h-[244px] flex-col items-center justify-center px-4 py-14 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8fdddf]">{pagesContent.about.badge}</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-extrabold uppercase leading-tight tracking-[-0.02em] sm:text-5xl">
              About {SITE_CONFIG.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{pagesContent.about.description}</p>
          </div>
        </section>

        <section className="funds-container grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="funds-card p-7 sm:p-9">
            <span className="inline-block bg-[#2b82df] px-3 py-1 text-sm font-bold text-white">Media Distribution</span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#343a42] sm:text-4xl">
              Independent media, built for clear stories.
            </h2>
            <div className="article-content mt-7">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={mediaRoute} className="inline-flex items-center gap-2 bg-[#2b82df] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1874d6]">
                Explore updates <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-bold text-[#2b82df] ring-1 ring-[#dfe4ec] transition hover:bg-[#2b82df] hover:text-white">
                Contact us
              </Link>
            </div>
          </article>

          <aside className="grid gap-6">
            {pagesContent.about.values.map((value, index) => (
              <div key={value.title} className="funds-card p-6">
                <div className="flex items-center justify-between gap-4">
                  <CheckCircle2 className="h-6 w-6 text-[#2b82df]" />
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#8b929d]">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-2xl font-extrabold leading-tight text-[#343a42]">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#555b63]">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>

        <section className="bg-[#f1f3f8] pb-12">
          <div className="funds-container funds-card grid gap-4 bg-white p-7 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#343a42]">Search the full archive</h2>
              <p className="mt-2 text-sm leading-6 text-[#555b63]">Find media releases, public updates, and category-led stories from across the site.</p>
            </div>
            <Link href="/search" className="inline-flex items-center justify-center gap-2 bg-[#2b82df] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1874d6]">
              Open search <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
