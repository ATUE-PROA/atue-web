import { Check, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import type { Plan } from '@/content/plans'
import { cn } from '@/lib/utils'

interface PlanCardProps {
  plan: Plan
}

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm',
        plan.recommended
          ? 'border-blue-600/50 ring-1 ring-blue-600/20 dark:border-blue-400/50 dark:ring-blue-400/20'
          : 'border-border',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{plan.name}</h3>
        <span
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
            plan.recommended
              ? 'border-blue-600/30 bg-blue-600/10 text-blue-800 dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-200'
              : 'border-border bg-muted text-muted-foreground',
          )}
        >
          {plan.badge}
        </span>
      </div>

      <p className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-tight text-foreground">{plan.price}</span>
        <span className="text-sm text-muted-foreground">{plan.priceSuffix}</span>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>

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

      <Button
        asChild
        variant={plan.recommended ? 'brand' : 'inverse'}
        size="xl"
        className="mt-6 w-full rounded-full"
      >
        <Link to={plan.href}>{plan.ctaLabel}</Link>
      </Button>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{plan.note}</p>
    </article>
  )
}
