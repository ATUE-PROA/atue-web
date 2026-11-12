import { ArrowRight, Globe } from 'lucide-react'

import { SEVERITY_STYLES } from '@/components/documents/severity'
import { Badge } from '@/components/ui/badge'
import { LANDING_PREVIEW } from '@/content/landing'
import { SEVERITY_CONTENT } from '@/content/documents'
import { cn } from '@/lib/utils'

const SCORE_BADGE_CLASSES =
  'border-yellow-600/30 bg-yellow-500/10 text-yellow-800 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-300'

/** Artefato de produto da primeira dobra. É uma amostra rotulada, não uma análise real. */
export default function ProductPreview() {
  return (
    <figure
      data-hero-card
      className="rounded-2xl bg-card p-5 ring-1 ring-border sm:p-6 lg:max-w-md lg:justify-self-end"
    >
      <figcaption>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className="border-blue-600/30 bg-blue-600/10 text-foreground">
            {LANDING_PREVIEW.badge}
          </Badge>
          <span className="text-xs text-muted-foreground">{LANDING_PREVIEW.dateLabel}</span>
        </div>
        <p className="mt-4 font-heading text-lg text-foreground">{LANDING_PREVIEW.title}</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Globe aria-hidden="true" className="size-4 shrink-0" />
          <span>{LANDING_PREVIEW.domain}</span>
        </p>
      </figcaption>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-border pt-5">
        <div>
          <p className="text-xs text-muted-foreground">{LANDING_PREVIEW.scoreCaption}</p>
          <p className="mt-1 flex items-baseline gap-1.5">
            <span className="font-heading text-4xl leading-none text-foreground tabular-nums">
              {LANDING_PREVIEW.score}
            </span>
            <span className="text-sm text-muted-foreground">de 100</span>
          </p>
        </div>
        <Badge variant="outline" className={cn('h-6 gap-1.5 px-2.5', SCORE_BADGE_CLASSES)}>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-yellow-500" />
          {LANDING_PREVIEW.scoreLabel}
        </Badge>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {LANDING_PREVIEW.summary}
      </p>

      <ul className="mt-4 space-y-2.5">
        {LANDING_PREVIEW.findings.map((finding) => {
          const severity = SEVERITY_STYLES[finding.severity]
          const Icon = severity.icon

          return (
            <li key={finding.title} className="flex items-start gap-2.5">
              <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 text-sm leading-snug text-foreground">
                {finding.title}
              </span>
              <Badge variant="outline" className={severity.badgeClassName}>
                {SEVERITY_CONTENT[finding.severity].label}
              </Badge>
            </li>
          )
        })}
      </ul>

      <div className="mt-5 rounded-lg bg-blue-600/10 p-3.5">
        <p className="text-xs text-muted-foreground">{LANDING_PREVIEW.nextActionLabel}</p>
        <p className="mt-1 flex items-start gap-2 text-sm font-medium text-foreground">
          <ArrowRight
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400"
          />
          {LANDING_PREVIEW.nextAction}
        </p>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        {LANDING_PREVIEW.footnote}
      </p>
    </figure>
  )
}
