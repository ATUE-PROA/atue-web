import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const focusClasses =
  'rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-blue-400/60'

interface BrandLinkProps {
  to?: string
  onClick?: () => void
}

export function BrandLink({ to = '/', onClick }: BrandLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label="ATUE"
      className={`inline-flex shrink-0 items-center ${focusClasses}`}
    >
      <img
        src="/brand/atue-logo-light.svg"
        alt=""
        width={839}
        height={302}
        className="h-8 w-auto dark:hidden"
      />
      <img
        src="/brand/atue-logo-dark.svg"
        alt=""
        width={839}
        height={302}
        className="hidden h-8 w-auto dark:block"
      />
    </Link>
  )
}

interface SiteHeaderProps {
  children: ReactNode
  submenu?: ReactNode
}

export function SiteHeader({ children, submenu }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        {children}
      </div>
      {submenu}
    </header>
  )
}
