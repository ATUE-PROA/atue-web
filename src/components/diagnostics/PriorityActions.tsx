import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { SEVERITY_STYLES } from '@/components/documents/severity'
import { Badge } from '@/components/ui/badge'
import { SectionCard } from '@/components/ui/section-card'
import { DIAGNOSTICS_CONTENT } from '@/content/diagnostics'
import { SEVERITY_CONTENT } from '@/content/documents'
import { sortIssuesBySeverity } from '@/lib/diagnostics'
import { cn } from '@/lib/utils'
import type { IssueCategory } from '@/types/api'

const PRIORITY_LIMIT = 3

interface PriorityActionsProps {
  issues: readonly IssueCategory[]
}

export function PriorityActions({ issues }: PriorityActionsProps) {
  const priorities = sortIssuesBySeverity(issues).slice(0, PRIORITY_LIMIT)
  const { title, description, nextStepLabel, nextSteps, action, emptyTitle, emptyDescription } =
    DIAGNOSTICS_CONTENT.priorities

  return (
    <SectionCard title={title} description={description}>
      {priorities.length === 0 ? (
        <div>
          <p className="text-sm font-medium text-foreground">{emptyTitle}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{emptyDescription}</p>
        </div>
      ) : (
        <ol className="space-y-4">
          {priorities.map((issue, index) => {
            const severityStyle = SEVERITY_STYLES[issue.severity]

            return (
              <li
                key={issue.id}
                className="border-t border-border pt-4 first:border-t-0 first:pt-0"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-xs font-medium text-blue-600 dark:text-blue-400"
                  >
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn('rounded-full px-2 py-0.5', severityStyle.badgeClassName)}
                      >
                        {SEVERITY_CONTENT[issue.severity].label}
                      </Badge>
                      <h3 className="text-base font-medium text-foreground">{issue.name}</h3>
                    </div>

                    {issue.recommendation ? (
                      <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {issue.recommendation}
                      </p>
                    ) : null}

                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      <span className="font-medium">{nextStepLabel}:</span>{' '}
                      {nextSteps[issue.severity]}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      )}

      <Link
        to="/documents"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors hover:text-blue-700 dark:hover:text-blue-300 focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
      >
        {action}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </SectionCard>
  )
}
