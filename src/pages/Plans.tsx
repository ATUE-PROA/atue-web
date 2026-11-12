import { ArrowLeft, Compass } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { PublicHeader } from '@/components/layout/public-header'
import { PublicFooter } from '@/components/layout/public-footer'
import { PlanBenefits } from '@/components/plans/PlanBenefits'
import { PlanCard } from '@/components/plans/PlanCard'
import { PlanComparison } from '@/components/plans/PlanComparison'
import { PlanFaq } from '@/components/plans/PlanFaq'
import { SupportCard } from '@/components/plans/SupportCard'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { Reveal, Stagger } from '@/components/ui/reveal'
import { PLANS, PLANS_CONTENT } from '@/content/plans'
import { useAuth } from '@/contexts/auth-context'
import { usePlan } from '@/contexts/plan-context'
import type { PlanId } from '@/types/plans.types'

const backLinkClasses =
  'inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none'

export function Plans() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { activePlan, requestSubscription, subscribe } = usePlan()

  const handleSelectPlan = (planId: PlanId) => {
    if (planId === activePlan) {
      navigate('/dashboard')
      return
    }

    requestSubscription(planId)
  }

  const handleExploreDemo = () => {
    if (!activePlan) {
      subscribe('growth')
    }

    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PublicHeader />

      <main id="conteudo" className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-6 pt-10 pb-16 sm:pt-14">
          <Link to="/" className={backLinkClasses}>
            <ArrowLeft aria-hidden="true" className="size-4" />
            Voltar para o início
          </Link>

          <div className="mt-6 max-w-3xl">
            <p className="text-eyebrow text-blue-600 dark:text-blue-400">
              {PLANS_CONTENT.hero.eyebrow}
            </p>
            <h1 className="text-display mt-4 text-foreground">{PLANS_CONTENT.hero.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {PLANS_CONTENT.hero.description}
            </p>
          </div>

          <div className="mt-8 max-w-3xl">
            <FormAlert
              tone="info"
              title={PLANS_CONTENT.demoBanner.title}
              description={PLANS_CONTENT.demoBanner.description}
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            {user ? (
              <Button type="button" variant="outline" size="xl" onClick={handleExploreDemo}>
                <Compass aria-hidden="true" />
                {PLANS_CONTENT.demoBanner.loggedInCta}
              </Button>
            ) : (
              <Button asChild variant="outline" size="xl">
                <Link to="/login">
                  <Compass aria-hidden="true" />
                  {PLANS_CONTENT.demoBanner.loggedOutCta}
                </Link>
              </Button>
            )}
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              {user
                ? PLANS_CONTENT.demoBanner.loggedInNote
                : PLANS_CONTENT.demoBanner.loggedOutNote}
            </p>
          </div>

          <div className="mt-10">
            <PlanBenefits />
          </div>
        </section>

        <section
          aria-labelledby="plan-comparison-heading"
          className="mx-auto w-full max-w-6xl px-6 pb-16"
        >
          <div className="max-w-2xl">
            <h2 id="plan-comparison-heading" className="text-section text-foreground">
              {PLANS_CONTENT.comparison.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {PLANS_CONTENT.comparison.description}
            </p>
          </div>

          <div className="mt-6">
            <PlanComparison />
          </div>
        </section>

        <section aria-labelledby="plans-heading" className="mx-auto w-full max-w-6xl px-6 pb-16">
          <h2 id="plans-heading" className="text-section text-foreground">
            {PLANS_CONTENT.plans.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {PLANS_CONTENT.plans.description}
          </p>

          <Stagger items="article" className="mt-8 grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isCurrent={activePlan === plan.id}
                onSelect={user ? handleSelectPlan : undefined}
              />
            ))}
          </Stagger>
        </section>

        <section
          aria-labelledby="plans-help-heading"
          className="mx-auto w-full max-w-6xl px-6 pb-20"
        >
          <h2 id="plans-help-heading" className="text-section text-foreground">
            {PLANS_CONTENT.help.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {PLANS_CONTENT.help.description}
          </p>

          <Reveal className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <PlanFaq />
            <SupportCard />
          </Reveal>
        </section>
      </main>

      <PublicFooter
        description={PLANS_CONTENT.footerDescription}
        copyright={PLANS_CONTENT.footer}
      />
    </div>
  )
}
