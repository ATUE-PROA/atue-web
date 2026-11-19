import { Globe } from 'lucide-react'

import { CountUp, ScaleBar } from '@/components/ui/count-up'
import { DIAGNOSTICS_CONTENT } from '@/content/diagnostics'
import { formatDocumentDateTime } from '@/lib/documents'
import { getScoreLevel } from '@/lib/diagnostics'
import { cn } from '@/lib/utils'

const TICKS = [0, 25, 50, 75, 100] as const

interface ScoreIndexProps {
  score: number
  createdAt: string
  url?: string
  className?: string
}

export function ScoreIndex({ score, createdAt, url, className }: ScoreIndexProps) {
  const level = getScoreLevel(score)
  const { index } = DIAGNOSTICS_CONTENT

  return (
    <section
      className={cn('card-surface flex flex-col p-6 sm:p-8', className)}
      aria-labelledby="indice-titulo"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="indice-titulo" className={cn('text-label', level.textClassName)}>
          {index.title}
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium">
          <span aria-hidden="true" className={cn('size-1.5 rounded-full', level.dotClassName)} />
          <span className={level.textClassName}>{level.label}</span>
        </span>
      </div>

      <p className="mt-4 flex items-baseline gap-2">
        <CountUp
          value={score}
          className={cn(
            'text-6xl leading-none font-bold tracking-tight tabular-nums',
            level.textClassName,
          )}
        />
        <span className="text-base text-muted-foreground">{index.scaleNote}</span>
      </p>

      <ScaleBar value={score} className="mt-4" color={level.chartColor} />

      <div
        aria-hidden="true"
        className="mt-2 flex justify-between text-xs text-muted-foreground tabular-nums"
      >
        {TICKS.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>

      <p className="sr-only">
        {index.title}: {score} de 100. Nível {level.label}.
      </p>

      <div className="mt-5 border-t border-border pt-4">
        {url ? (
          <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <Globe aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{url}</span>
          </p>
        ) : null}
        <p className="mt-1 text-xs text-muted-foreground tabular-nums">
          {index.updatedLabel} {formatDocumentDateTime(createdAt)}
        </p>
      </div>

      <details className="mt-4 border-t border-border pt-4">
        <summary className="cursor-pointer text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
          {index.dimensionsLabel}
        </summary>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-relaxed text-muted-foreground">
          {index.dimensions.map((dimension) => (
            <li key={dimension}>{dimension}</li>
          ))}
        </ul>
      </details>

      <p className="mt-auto pt-4 text-xs leading-relaxed text-muted-foreground">
        {index.disclaimer}
      </p>
    </section>
  )
}
