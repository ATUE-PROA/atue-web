import { Check, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PLAN_GATE_CONTENT, type Plan } from '@/content/plans'
import { cn } from '@/lib/utils'
import type { PlanId } from '@/types/plans.types'

interface PlanCardProps {
  plan: Plan
  isCurrent?: boolean
  onSelect?: (planId: PlanId) => void
}

export function PlanCard({ plan, isCurrent = false, onSelect }: PlanCardProps) {
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-2xl border bg-card p-6 sm:p-8',
        plan.recommended ? 'border-blue-600/40 ring-1 ring-blue-600/15' : 'border-border shadow-sm',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{plan.name}</h3>
        <Badge
          variant="outline"
          className={cn(
            'h-auto shrink-0 rounded-full px-3 py-1',
            plan.recommended
              ? 'border-blue-600/30 bg-blue-600/10 text-blue-600 dark:text-blue-400'
              : 'border-border bg-muted text-muted-foreground',
          )}
        >
          {plan.badge}
        </Badge>
      </div>

      <p className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-tight text-foreground">{plan.price}</span>
        <span className="text-sm text-muted-foreground">{plan.priceSuffix}</span>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>

      {isCurrent ? (
        <Badge
          variant="outline"
          className="mt-4 h-auto w-fit rounded-full border-green-600/30 bg-green-600/10 px-3 py-1 text-green-800 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300"
        >
          <Check aria-hidden="true" />
          {PLAN_GATE_CONTENT.currentPlanLabel}
        </Badge>
      ) : null}

      <div className="mt-5 flex-1">
        {plan.inherits ? (
          <p className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400">
            <Plus aria-hidden="true" className="size-3.5 shrink-0" />
            {plan.inherits}
          </p>
        ) : null}

        <ul className={cn('space-y-2.5', plan.inherits ? 'mt-3' : 'mt-0')}>
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
              <Check
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {onSelect ? (
        <Button
          type="button"
          variant={plan.recommended ? 'brand' : 'outline'}
          size="xl"
          className="mt-6 w-full"
          onClick={() => onSelect(plan.id)}
        >
          {isCurrent ? PLAN_GATE_CONTENT.currentPlanCta : plan.ctaLabel}
        </Button>
      ) : (
        <Button
          asChild
          variant={plan.recommended ? 'brand' : 'outline'}
          size="xl"
          className="mt-6 w-full"
        >
          <Link to={plan.href}>{plan.ctaLabel}</Link>
        </Button>
      )}

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{plan.note}</p>
    </article>
  )
}
