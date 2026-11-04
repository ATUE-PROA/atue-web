import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { BrandLink, SiteHeader } from '@/components/layout/site-header'
import { ThemeToggle } from '@/components/layout/theme-toggle'

const backLinkClasses =
  'inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-blue-400/60'

function AuthHeader({ backLabel }: { backLabel: string }) {
  return (
    <SiteHeader>
      <BrandLink />
      <div className="flex items-center gap-2">
        <Link to="/" className={backLinkClasses}>
          <ArrowLeft aria-hidden="true" className="size-4" />
          {backLabel}
        </Link>
        <ThemeToggle />
      </div>
    </SiteHeader>
  )
}

interface AuthLayoutProps {
  aside: ReactNode
  children: ReactNode
  backLabel?: string
}

export function AuthLayout({ aside, children, backLabel = 'Voltar ao site' }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AuthHeader backLabel={backLabel} />

      <main className="mx-auto flex w-full max-w-6xl flex-1 items-start px-6 py-10 sm:py-14 lg:items-center lg:py-16">
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          {aside}
          <div className="w-full max-w-md lg:justify-self-end">{children}</div>
        </div>
      </main>
    </div>
  )
}

interface AuthCenteredLayoutProps {
  children: ReactNode
  backLabel?: string
}

export function AuthCenteredLayout({
  children,
  backLabel = 'Voltar ao site',
}: AuthCenteredLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AuthHeader backLabel={backLabel} />

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-10 sm:py-14">
        {children}
      </main>
    </div>
  )
}
