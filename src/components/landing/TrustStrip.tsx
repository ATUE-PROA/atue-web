import { Building2, Laptop, Scale } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { LANDING_TRUST } from '@/content/landing'

const TRUST_ICONS: readonly LucideIcon[] = [Laptop, Scale, Building2] as const

/** Faixa compacta de fatos verificáveis. Sem selos, logos ou depoimentos inventados. */
export default function TrustStrip() {
  return (
    <section aria-label="Compromissos do ATUE" className="border-y border-border/60 bg-card">
      <ul className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 sm:grid-cols-3 sm:gap-10">
        {LANDING_TRUST.map((fact, index) => {
          const Icon = TRUST_ICONS[index]

          return (
            <li key={fact.title} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="shrink-0 rounded-lg bg-blue-600/10 p-2 text-blue-600 dark:text-blue-400"
              >
                <Icon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{fact.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {fact.description}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
