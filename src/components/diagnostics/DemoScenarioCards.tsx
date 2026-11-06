import { Building2, CheckCircle2, Loader2 } from 'lucide-react'

import { FormAlert } from '@/components/ui/form-alert'
import { SCENARIOS_CONTENT } from '@/content/scenarios'
import { getScoreLevel } from '@/lib/diagnostics'
import { cn } from '@/lib/utils'
import type { DemoScenario, DemoScenarioId } from '@/types/scenarios.types'

interface DemoScenarioCardsProps {
  scenarios: readonly DemoScenario[]
  activeScenarioId: DemoScenarioId | null
  status: 'loading' | 'ready' | 'error'
  onApply: (scenarioId: DemoScenarioId) => void
  onRetry: () => void
}

export function DemoScenarioCards({
  scenarios,
  activeScenarioId,
  status,
  onApply,
  onRetry,
}: DemoScenarioCardsProps) {
  return (
    <section aria-labelledby="scenarios-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="scenarios-heading"
            className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
          >
            {SCENARIOS_CONTENT.sectionTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {SCENARIOS_CONTENT.sectionDescription}
          </p>
        </div>
      </div>

      {status === 'loading' ? (
        <p role="status" className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          {SCENARIOS_CONTENT.loading}
        </p>
      ) : null}

      {status === 'error' ? (
        <div className="mt-3">
          <FormAlert
            tone="error"
            title={SCENARIOS_CONTENT.errorTitle}
            description={SCENARIOS_CONTENT.errorDescription}
          />
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 rounded-md text-sm font-medium text-blue-700 transition-colors hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:text-blue-300 dark:hover:text-blue-200"
          >
            {SCENARIOS_CONTENT.retryLabel}
          </button>
        </div>
      ) : null}

      {status === 'ready' ? (
        <ul className="mt-3 grid gap-3 md:grid-cols-3">
          {scenarios.map((scenario) => {
            const level = getScoreLevel(scenario.report.score)
            const isActive = activeScenarioId === scenario.id

            return (
              <li key={scenario.id}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onApply(scenario.id)}
                  className={cn(
                    'flex h-full w-full flex-col rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-colors hover:border-blue-600/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:hover:border-blue-400/40 dark:focus-visible:ring-blue-400/60',
                    isActive &&
                      'border-blue-600/50 ring-1 ring-blue-600/20 dark:border-blue-400/50 dark:ring-blue-400/20',
                  )}
                >
                  <span className="flex items-start justify-between gap-2">
                    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                      <Building2 aria-hidden="true" className="size-4" />
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-xs font-medium text-foreground">
                      <span
                        aria-hidden="true"
                        className={cn('size-1.5 rounded-full', level.dotClassName)}
                      />
                      {scenario.report.score}/100
                    </span>
                  </span>

                  <span className="mt-3 text-sm font-medium text-foreground">
                    {scenario.companyName}
                  </span>
                  <span className="mt-0.5 text-xs text-muted-foreground">{scenario.sector}</span>
                  <span className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {scenario.description}
                  </span>

                  <span className="mt-3 flex items-center gap-1.5 text-xs font-medium text-blue-700 dark:text-blue-300">
                    {isActive ? (
                      <>
                        <CheckCircle2 aria-hidden="true" className="size-3.5" />
                        {SCENARIOS_CONTENT.appliedLabel}
                      </>
                    ) : (
                      SCENARIOS_CONTENT.applyLabel
                    )}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {SCENARIOS_CONTENT.demoNotice}
      </p>
    </section>
  )
}
