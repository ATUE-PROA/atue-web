import { useEffect } from 'react'
import { ArrowRight, LockKeyhole, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { PLAN_FEATURES, PLAN_GATE_CONTENT } from '@/content/plans'
import { usePlan } from '@/contexts/plan-context'
import { getPlanName } from '@/lib/plans'

export function SubscriptionPrompt() {
  const navigate = useNavigate()
  const { gate, isDemo, dismissGate, subscribe } = usePlan()

  useEffect(() => {
    if (!gate) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dismissGate()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [dismissGate, gate])

  if (!gate) {
    return null
  }

  const isSubscription = gate.kind === 'subscription'
  const planName = getPlanName(
    gate.kind === 'subscription' ? gate.planId : PLAN_FEATURES[gate.featureId].requiredPlan,
  )
  const eyebrow = isSubscription
    ? PLAN_GATE_CONTENT.subscription.eyebrow
    : PLAN_GATE_CONTENT.eyebrow
  const title = isSubscription
    ? PLAN_GATE_CONTENT.subscription.title.replace('{plan}', planName)
    : gate.featureId === 'product-access'
      ? 'Assine um plano para entrar na área logada'
      : PLAN_GATE_CONTENT.title
  const description = isSubscription
    ? PLAN_GATE_CONTENT.subscription.description.replace('{plan}', planName)
    : (isDemo ? PLAN_GATE_CONTENT.demoDescription : PLAN_GATE_CONTENT.description)
        .replace('{feature}', PLAN_FEATURES[gate.featureId].label)
        .replace('{plan}', planName)
  const primaryLabel = isSubscription
    ? PLAN_GATE_CONTENT.subscription.primaryLabel.replace('{plan}', planName)
    : PLAN_GATE_CONTENT.primaryLabel

  return (
    <div className="pointer-events-none fixed inset-x-0 top-16 z-40 px-4 sm:px-6">
      <div
        role="status"
        aria-label={eyebrow}
        className="pointer-events-auto mx-auto flex w-full max-w-3xl items-start gap-3 rounded-xl border border-blue-600/30 bg-card p-4 text-card-foreground shadow-lg animate-in fade-in slide-in-from-top-4 duration-300 motion-reduce:animate-none sm:gap-4 sm:p-5 dark:border-blue-400/30"
      >
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
          <LockKeyhole aria-hidden="true" className="size-4" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
            {eyebrow}
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {gate.kind === 'subscription' ? (
              <Button
                type="button"
                variant="brand"
                size="lg"
                onClick={() => {
                  subscribe(gate.planId)
                  navigate('/dashboard')
                }}
              >
                {primaryLabel}
                <ArrowRight aria-hidden="true" />
              </Button>
            ) : (
              <Button asChild variant="brand" size="lg">
                <Link to="/plans" onClick={dismissGate}>
                  {primaryLabel}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            )}

            <Button type="button" variant="outline" size="lg" onClick={dismissGate}>
              {PLAN_GATE_CONTENT.secondaryLabel}
            </Button>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={PLAN_GATE_CONTENT.closeLabel}
          onClick={dismissGate}
        >
          <X aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
