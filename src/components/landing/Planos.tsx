import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Reveal, Stagger } from '@/components/ui/reveal'
import { LANDING_SECTIONS } from '@/content/landing'
import { PLANS } from '@/content/plans'
import { cn } from '@/lib/utils'

export default function Planos() {
  return (
    <section
      id="planos"
      aria-labelledby="planos-titulo"
      className="mx-auto w-full max-w-7xl px-6 pb-20"
    >
      <Reveal className="max-w-2xl">
        <h2 id="planos-titulo" className="text-section text-foreground">
          {LANDING_SECTIONS.plans.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {LANDING_SECTIONS.plans.description}
        </p>
      </Reveal>

      <Stagger items=":scope > li" stagger={0.08}>
        <ul className="mt-10 grid items-start gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <li
              key={plan.id}
              className={cn(
                'card-surface flex h-full flex-col p-6 sm:p-8',
                plan.recommended && 'ring-2 ring-blue-600/40 lg:scale-[1.03]',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-1 text-xs font-medium',
                    plan.recommended ? 'bg-blue-600 text-white' : 'bg-muted text-muted-foreground',
                  )}
                >
                  {plan.badge}
                </span>
              </div>

              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold tracking-tight text-foreground tabular-nums">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">{plan.priceSuffix}</span>
              </p>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {plan.description}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-blue-600" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={plan.recommended ? 'brand' : 'outline'}
                size="xl"
                className="mt-6 w-full"
              >
                <Link to={plan.href}>{plan.ctaLabel}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </Stagger>

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        Valores ilustrativos de demonstração. A assinatura é simulada no navegador e nenhuma
        cobrança é feita.
      </p>
    </section>
  )
}
