'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export function EditableFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#222] text-[#9ca3ad]">
      <div className="funds-container flex min-h-[62px] flex-col justify-center gap-3 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright &copy;{year} {SITE_CONFIG.name} All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <Link href="/search" className="hover:text-white">Search</Link>
        </div>
      </div>
      <a href="#top" className="funds-top-button" aria-label="Back to top">^</a>
    </footer>
  )
}
