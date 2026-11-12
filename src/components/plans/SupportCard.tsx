import { Clock, Mail, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Photo } from '@/components/ui/photo'
import { PLAN_SUPPORT } from '@/content/plans'

const ICONS = {
  mail: Mail,
  clock: Clock,
  message: MessageSquare,
} as const

export function SupportCard() {
  return (
    <section
      aria-labelledby="plan-support-heading"
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Photo {...PLAN_SUPPORT.photo} className="absolute inset-0" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3
          id="plan-support-heading"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          {PLAN_SUPPORT.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {PLAN_SUPPORT.description}
        </p>

        <ul className="mt-5 flex-1 space-y-4">
          {PLAN_SUPPORT.items.map((item) => {
            const Icon = ICONS[item.icon]

            return (
              <li key={item.id} className="flex items-start gap-3">
                <Icon
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400"
                />
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground">{item.value}</p>
                </div>
              </li>
            )
          })}
        </ul>

        <Button asChild variant="outline" size="xl" className="mt-6 w-full">
          <Link to={PLAN_SUPPORT.href}>{PLAN_SUPPORT.ctaLabel}</Link>
        </Button>
      </div>
    </section>
  )
}
