'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <header className="sticky top-0 z-50 bg-[var(--slot4-surface-bg)] text-black shadow-[0_1px_0_rgba(0,0,0,.18)]">
      <div className="mx-auto grid min-h-[88px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center border border-black/25 lg:hidden" aria-label="Toggle navigation">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <Link href="/" className="editorial-brand max-w-[54vw] truncate text-center text-3xl font-black text-[var(--slot4-accent)] sm:text-5xl">
          {SITE_CONFIG.name}
        </Link>

        <div className="flex items-center justify-end gap-4">
          {session ? (
            <>
              <Link href="/create" className="hidden text-xs font-black uppercase tracking-[.12em] sm:block">Create</Link>
              <button type="button" onClick={logout} className="hidden text-xs font-black uppercase tracking-[.12em] sm:block">Logout</button>
            </>
          ) : <Link href="/login" className="hidden text-xs font-black uppercase tracking-[.12em] sm:block">Log in</Link>}
          <Link href={session ? '/create' : '/signup'} className="bg-[var(--slot4-accent)] px-4 py-3 text-[10px] font-black uppercase tracking-[.14em] text-white sm:px-6">
            {session ? 'Publish' : 'Subscribe'}
          </Link>
        </div>
      </div>

      <div className="bg-black text-white">
        <div className="mx-auto flex min-h-[54px] max-w-[1440px] items-center px-4 sm:px-6 lg:px-10">
          <Link href="/" className="mr-6 hidden items-center gap-2 text-xs font-black uppercase tracking-[.16em] lg:flex"><Menu className="h-4 w-4" /> Menu</Link>
          <form action="/search" className="ml-auto flex min-w-0 flex-1 items-center border-l border-white/20 lg:max-w-[270px] lg:flex-none">
            <Search className="ml-4 h-4 w-4 text-white/65" />
            <input name="q" type="search" placeholder="Search the archive" className="min-w-0 flex-1 bg-transparent px-3 py-4 text-xs font-bold outline-none placeholder:text-white/45" />
          </form>
        </div>
      </div>

      {open ? (
        <div className="border-t border-black/15 bg-[var(--slot4-surface-bg)] px-4 py-4 lg:hidden">
          <div className="grid gap-px bg-black/15">
            {[{ label: 'Home', href: '/' }, { label: 'Archive', href: '/search' }, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="bg-white px-4 py-3 text-sm font-black uppercase tracking-[.1em]">{item.label}</Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
