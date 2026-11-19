import { Compass, FileText, FolderCheck, RefreshCw } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Reveal, Stagger } from '@/components/ui/reveal'
import { LANDING_FEATURES, LANDING_SECTIONS } from '@/content/landing'
import { cn } from '@/lib/utils'

const FEATURE_ICONS: readonly LucideIcon[] = [Compass, FolderCheck, FileText, RefreshCw] as const

/** Quatro cards com spans diferentes: nunca três colunas de largura igual. */
const SPANS = ['lg:col-span-2', 'lg:col-span-1', 'lg:col-span-1', 'lg:col-span-2'] as const

export default function Features() {
  return (
    <section id="beneficios" aria-labelledby="beneficios-titulo">
      <div className="mx-auto w-full max-w-7xl px-6 pb-20">
        <Reveal>
          <h2 id="beneficios-titulo" className="max-w-2xl text-section text-foreground">
            {LANDING_SECTIONS.features.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {LANDING_SECTIONS.features.description}
          </p>
        </Reveal>

        <Stagger items=":scope > li" stagger={0.08}>
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {LANDING_FEATURES.map((feature, index) => {
              const Icon = FEATURE_ICONS[index]

              return (
                <li
                  key={feature.title}
                  className={cn(
                    'card-surface card-interactive p-6 sm:p-8',
                    SPANS[index],
                    SPANS[index] === 'lg:col-span-2' ? 'lg:p-10' : '',
                  )}
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </li>
              )
            })}
          </ul>
        </Stagger>
      </div>
    </section>
  )
}
