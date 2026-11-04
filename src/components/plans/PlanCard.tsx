import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import type { Plan } from '@/content/plans'

interface PlanCardProps {
  plan: Plan
}

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{plan.name}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>

      <div className="mt-6">
        <p className="text-2xl font-semibold tracking-tight text-foreground">{plan.priceLabel}</p>
        <p className="mt-1 text-xs text-muted-foreground">{plan.priceNote}</p>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
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

      <Button asChild variant="brand" size="xl" className="mt-8 w-full">
        <Link to={plan.href}>{plan.ctaLabel}</Link>
      </Button>
    </article>
  )
}
