import { Layers, ShieldCheck, TrendingUp } from 'lucide-react'

import { PLAN_BENEFITS, type PlanBenefit } from '@/content/plans'

const ICONS = {
  layers: Layers,
  shield: ShieldCheck,
  growth: TrendingUp,
} as const

function BenefitIcon({ icon }: { icon: PlanBenefit['icon'] }) {
  const Icon = ICONS[icon]

  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
      <Icon aria-hidden="true" className="size-4" />
    </span>
  )
}

export function PlanBenefits() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {PLAN_BENEFITS.map((benefit) => (
        <li
          key={benefit.id}
          className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-5 dark:border-border dark:bg-card"
        >
          <BenefitIcon icon={benefit.icon} />
          <div>
            <h3 className="text-sm font-medium text-foreground">{benefit.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {benefit.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
