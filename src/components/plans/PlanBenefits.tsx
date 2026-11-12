import { Layers, ShieldCheck, TrendingUp } from 'lucide-react'

import { PLAN_BENEFITS, type PlanBenefit } from '@/content/plans'
import { Stagger } from '@/components/ui/reveal'

const ICONS = {
  layers: Layers,
  shield: ShieldCheck,
  growth: TrendingUp,
} as const

function BenefitIcon({ icon }: { icon: PlanBenefit['icon'] }) {
  const Icon = ICONS[icon]

  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400">
      <Icon aria-hidden="true" className="size-4" />
    </span>
  )
}

export function PlanBenefits() {
  return (
    <Stagger items="li">
      <ul className="grid gap-8 md:grid-cols-3 md:gap-10">
        {PLAN_BENEFITS.map((benefit) => (
          <li key={benefit.id} className="border-t border-border pt-5">
            <BenefitIcon icon={benefit.icon} />
            <h3 className="mt-4 text-base font-semibold text-foreground">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {benefit.description}
            </p>
          </li>
        ))}
      </ul>
    </Stagger>
  )
}
