import { Compass, FileText, FolderCheck, RefreshCw } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Reveal, Stagger } from '@/components/ui/reveal'
import { LANDING_BENEFITS_INTRO, LANDING_FEATURES } from '@/content/landing'

const FEATURE_ICONS: readonly LucideIcon[] = [Compass, FolderCheck, FileText, RefreshCw] as const

export default function FeatureStrip() {
  return (
    <section id="beneficios" className="scroll-mt-16 border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="text-eyebrow text-blue-600 dark:text-blue-400">
              {LANDING_BENEFITS_INTRO.eyebrow}
            </p>
            <h2 className="mt-4 text-section text-foreground">{LANDING_BENEFITS_INTRO.title}</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              {LANDING_BENEFITS_INTRO.description}
            </p>
          </Reveal>

          <Stagger items="li" delay={0.08}>
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {LANDING_FEATURES.map((feature, index) => {
                const Icon = FEATURE_ICONS[index]

                return (
                  <li key={feature.title} className="border-t border-border pt-5">
                    <Icon aria-hidden="true" className="size-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="mt-3 text-base font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </li>
                )
              })}
            </ul>
          </Stagger>
        </div>
      </div>
    </section>
  )
}
