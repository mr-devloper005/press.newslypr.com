import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, UserPlus } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main id="top" className="min-h-screen bg-[#f1f3f8] text-[#222a33]">
        <section className="bg-[#303030] text-white">
          <div className="funds-container flex min-h-[244px] flex-col items-center justify-center px-4 py-14 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8fdddf]">{pagesContent.auth.signup.badge}</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-extrabold uppercase leading-tight tracking-[-0.02em] sm:text-5xl">
              {pagesContent.auth.signup.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{pagesContent.auth.signup.description}</p>
          </div>
        </section>

        <section className="funds-container grid gap-8 py-10 lg:grid-cols-[420px_minmax(0,1fr)]">
          <aside className="funds-card bg-white p-7 sm:p-8">
            <span className="inline-block bg-[#2b82df] px-3 py-1 text-sm font-bold text-white">Join</span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#343a42]">Create a clean publishing account in a few seconds.</h2>
            <p className="mt-4 text-sm leading-7 text-[#555b63]">Use the same simple account flow while the page now matches the broader site design.</p>
            <Link href="/search" className="mt-8 inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-bold text-[#2b82df] ring-1 ring-[#dfe4ec] transition hover:bg-[#2b82df] hover:text-white">
              Browse first <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>

          <div className="funds-card flex flex-col justify-center p-7 sm:p-9">
            <div className="grid h-16 w-16 place-items-center bg-[#eaf4ff] text-[#2b82df]">
              <UserPlus className="h-7 w-7" />
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-[#8b929d]">Create account</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#343a42] sm:text-4xl">{pagesContent.auth.signup.formTitle}</h2>
            <EditableLocalSignupForm />
            <p className="mt-6 border-t border-[#e6eaf2] pt-5 text-sm leading-6 text-[#555b63]">
              Already have an account? <Link href="/login" className="font-bold text-[#2b82df] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link>
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
