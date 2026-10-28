import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { BrandLink, SiteHeader } from '@/components/layout/site-header'

interface AuthLayoutProps {
  aside: ReactNode
  children: ReactNode
  backLabel?: string
}

const backLinkClasses =
  'inline-flex items-center gap-1.5 rounded-md text-sm text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950'

export function AuthLayout({ aside, children, backLabel = 'Voltar ao site' }: AuthLayoutProps) {
  return (
    <div
      data-page-surface="dark"
      className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50"
    >
      <SiteHeader>
        <BrandLink />
        <Link to="/" className={backLinkClasses}>
          <ArrowLeft aria-hidden="true" className="size-4" />
          {backLabel}
        </Link>
      </SiteHeader>

      <main className="mx-auto flex w-full max-w-6xl flex-1 items-start px-6 py-10 sm:py-14 lg:items-center lg:py-16">
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          {aside}
          <div className="w-full max-w-md lg:justify-self-end">{children}</div>
        </div>
      </main>
    </div>
  )
}
