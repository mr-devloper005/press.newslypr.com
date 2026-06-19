import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main id="top" className="min-h-screen bg-[#f1f3f8] text-[#222a33]">
        <section className="bg-[#303030] text-white">
          <div className="funds-container flex min-h-[244px] flex-col items-center justify-center px-4 py-14 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8fdddf]">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-extrabold uppercase leading-tight tracking-[-0.02em] sm:text-5xl">
              {pagesContent.auth.login.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{pagesContent.auth.login.description}</p>
          </div>
        </section>

        <section className="funds-container grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="funds-card flex flex-col justify-center p-7 sm:p-9">
            <div className="grid h-16 w-16 place-items-center bg-[#eaf4ff] text-[#2b82df]">
              <LockKeyhole className="h-7 w-7" />
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-[#8b929d]">Member access</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#343a42] sm:text-4xl">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-6 border-t border-[#e6eaf2] pt-5 text-sm leading-6 text-[#555b63]">
              New here? <Link href="/signup" className="font-bold text-[#2b82df] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link>
            </p>
          </div>

          <aside className="funds-card bg-white p-7 sm:p-8">
            <span className="inline-block bg-[#2b82df] px-3 py-1 text-sm font-bold text-white">Account</span>
            <h3 className="mt-5 text-3xl font-extrabold leading-tight text-[#343a42]">A focused space for publishing and managing updates.</h3>
            <p className="mt-4 text-sm leading-7 text-[#555b63]">Sign in to continue using the available publishing tools and keep your workflow connected to the site experience.</p>
            <Link href="/search" className="mt-8 inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-bold text-[#2b82df] ring-1 ring-[#dfe4ec] transition hover:bg-[#2b82df] hover:text-white">
              Browse archive <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
