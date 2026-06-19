'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
]

export function EditableNavbar() {
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <header className="z-50 bg-white text-[#222]">
      <div className="funds-container flex min-h-[120px] flex-col items-center justify-center gap-6 py-6 md:flex-row md:justify-between">
        <Link href="/" className="funds-title-font block max-w-full truncate text-center text-[42px] leading-none text-[#2b82df] sm:text-[56px] md:text-left">
          {SITE_CONFIG.name}
        </Link>

        <nav aria-label="Primary navigation" className="flex flex-wrap items-center justify-center gap-3">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="border border-[#dfe4ec] bg-white px-4 py-3 text-sm font-bold uppercase text-[#222a33] shadow-[0_1px_2px_rgba(21,34,52,.04)] transition hover:-translate-y-0.5 hover:border-[#2b82df] hover:text-[#2b82df]">
              {item.label}
            </Link>
          ))}
          {session ? (
            <button type="button" onClick={logout} className="border border-[#dfe4ec] bg-white px-4 py-3 text-sm font-bold uppercase text-[#222a33] shadow-[0_1px_2px_rgba(21,34,52,.04)] transition hover:-translate-y-0.5 hover:border-[#2b82df] hover:text-[#2b82df]">
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="border border-[#dfe4ec] bg-white px-4 py-3 text-sm font-bold uppercase text-[#222a33] shadow-[0_1px_2px_rgba(21,34,52,.04)] transition hover:-translate-y-0.5 hover:border-[#2b82df] hover:text-[#2b82df]">
                Login
              </Link>
              <Link href="/signup" className="border border-[#dfe4ec] bg-white px-4 py-3 text-sm font-bold uppercase text-[#222a33] shadow-[0_1px_2px_rgba(21,34,52,.04)] transition hover:-translate-y-0.5 hover:border-[#2b82df] hover:text-[#2b82df]">
                Signup
              </Link>
            </>
          )}
          <Link href="/search" className="inline-flex items-center gap-2 bg-[#2b82df] px-4 py-3 text-sm font-bold uppercase text-white shadow-[0_8px_20px_rgba(43,130,223,.22)] transition hover:-translate-y-0.5 hover:bg-[#1874d6]">
            <Search className="h-4 w-4" />
            Search
          </Link>
        </nav>
      </div>

      <div className="h-[50px] bg-[#2b82df]" />
    </header>
  )
}
