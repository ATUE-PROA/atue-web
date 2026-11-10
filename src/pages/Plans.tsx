import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { PublicHeader } from '@/components/layout/public-header'
import { PublicFooter } from '@/components/layout/public-footer'
import { PlanBenefits } from '@/components/plans/PlanBenefits'
import { PlanCard } from '@/components/plans/PlanCard'
import { PlanComparison } from '@/components/plans/PlanComparison'
import { PlanFaq } from '@/components/plans/PlanFaq'
import { SupportCard } from '@/components/plans/SupportCard'
import { Button } from '@/components/ui/button'
import { PLANS, PLANS_CONTENT } from '@/content/plans'
import { useAuth } from '@/contexts/auth-context'
import { usePlan } from '@/contexts/plan-context'
import type { PlanId } from '@/types/plans.types'

export function Plans() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { activePlan, requestSubscription } = usePlan()

  const handleSelectPlan = (planId: PlanId) => {
    if (planId === activePlan) {
      navigate('/dashboard')
      return
    }

    requestSubscription(planId)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PublicHeader />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-6 pt-8 pb-14 sm:pt-12">
          <Button asChild variant="outline" size="lg" className="w-fit">
            <Link to="/">
              <ArrowLeft aria-hidden="true" />
              Voltar para o início
            </Link>
          </Button>

          <div className="mt-6 max-w-3xl">
            <p className="text-xs font-medium tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
              {PLANS_CONTENT.hero.eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
              {PLANS_CONTENT.hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {PLANS_CONTENT.hero.description}
            </p>
          </div>

          <div className="mt-8">
            <PlanBenefits />
          </div>
        </section>

        <section
          aria-labelledby="plan-comparison-heading"
          className="mx-auto w-full max-w-6xl px-6 pb-14"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2
                id="plan-comparison-heading"
                className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              >
                {PLANS_CONTENT.comparison.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {PLANS_CONTENT.comparison.description}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <PlanComparison />
          </div>
        </section>

        <section aria-labelledby="plans-heading" className="mx-auto w-full max-w-6xl px-6 pb-14">
          <h2
            id="plans-heading"
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {PLANS_CONTENT.plans.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {PLANS_CONTENT.plans.description}
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isCurrent={activePlan === plan.id}
                onSelect={user ? handleSelectPlan : undefined}
              />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="plans-help-heading"
          className="mx-auto w-full max-w-6xl px-6 pb-16"
        >
          <h2
            id="plans-help-heading"
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {PLANS_CONTENT.help.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {PLANS_CONTENT.help.description}
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <PlanFaq />
            <SupportCard />
          </div>
        </section>
      </main>

      <PublicFooter
        description={PLANS_CONTENT.footerDescription}
        copyright={PLANS_CONTENT.footer}
      />
    </div>
  )
}
