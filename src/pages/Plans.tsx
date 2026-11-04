import { Link } from 'react-router-dom'

import { BrandLink, SiteHeader } from '@/components/layout/site-header'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { PlanCard } from '@/components/plans/PlanCard'
import { PLANS, PLANS_CONTENT } from '@/content/plans'

const linkClasses =
  'rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-blue-400/60'

export function Plans() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader>
        <BrandLink />
        <div className="flex items-center gap-3">
          <Link to="/login" className={linkClasses}>
            Entrar
          </Link>
          <ThemeToggle />
        </div>
      </SiteHeader>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
              {PLANS_CONTENT.eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              {PLANS_CONTENT.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {PLANS_CONTENT.description}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
            {PLANS_CONTENT.disclaimer}
          </p>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">{PLANS_CONTENT.footer}</p>
          <Link to="/" className={linkClasses}>
            Voltar ao site
          </Link>
        </div>
      </footer>
    </div>
  )
}
