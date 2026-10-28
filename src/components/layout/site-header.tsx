import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const focusClasses =
  'rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950'

interface BrandLinkProps {
  onClick?: () => void
}

export function BrandLink({ onClick }: BrandLinkProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`text-lg font-semibold tracking-widest text-white uppercase ${focusClasses}`}
    >
      ATUE
    </Link>
  )
}

interface SiteHeaderProps {
  children: ReactNode
  submenu?: ReactNode
}

export function SiteHeader({ children, submenu }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        {children}
      </div>
      {submenu}
    </header>
  )
}
