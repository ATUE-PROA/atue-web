import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { AppNavLink } from '@/content/navigation'
import { cn } from '@/lib/utils'

const linkClasses =
  'inline-flex items-center gap-1.5 rounded-md border border-blue-100 bg-blue-50/50 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-blue-100/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-border dark:bg-card dark:hover:bg-muted dark:focus-visible:ring-blue-400/60'

interface CrossLinksProps {
  links: readonly AppNavLink[]
  ariaLabel: string
  className?: string
}

export function CrossLinks({ links, ariaLabel, className }: CrossLinksProps) {
  return (
    <nav aria-label={ariaLabel} className={cn('flex flex-wrap gap-2', className)}>
      {links.map((link) => (
        <Link key={link.to} to={link.to} className={linkClasses}>
          {link.label}
          <ChevronRight aria-hidden="true" className="size-3.5 text-muted-foreground" />
        </Link>
      ))}
    </nav>
  )
}
