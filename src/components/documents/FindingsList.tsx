import { ChevronDown } from 'lucide-react'

import { SEVERITY_STYLES } from '@/components/documents/severity'
import { DOCUMENTS_CONTENT, SEVERITY_CONTENT } from '@/content/documents'
import { sortIssuesBySeverity } from '@/lib/diagnostics'
import { cn } from '@/lib/utils'
import type { IssueCategory } from '@/types/api'

interface FindingsListProps {
  issues: readonly IssueCategory[]
  emptyMessage?: string
  className?: string
}

export function FindingsList({
  issues,
  emptyMessage = DOCUMENTS_CONTENT.result.emptyFindings,
  className,
}: FindingsListProps) {
  const orderedIssues = sortIssuesBySeverity(issues)

  if (orderedIssues.length === 0) {
    return <p className={cn('text-sm text-muted-foreground', className)}>{emptyMessage}</p>
  }

  return (
    <ul className={cn('space-y-3', className)}>
      {orderedIssues.map((issue) => {
        const severityStyle = SEVERITY_STYLES[issue.severity]
        const SeverityIcon = severityStyle.icon

        return (
          <li key={issue.id}>
            <details className="group overflow-hidden rounded-lg border border-border bg-background open:bg-muted/30">
              <summary className="flex cursor-pointer list-none items-start gap-3 p-3 focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-inset focus-visible:outline-none dark:focus-visible:ring-blue-400/60 [&::-webkit-details-marker]:hidden">
                <SeverityIcon
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
                        severityStyle.badgeClassName,
                      )}
                    >
                      {SEVERITY_CONTENT[issue.severity].label}
                    </span>
                    <span className="text-xs text-muted-foreground">{issue.category}</span>
                  </div>
                  <p className="mt-1 font-medium text-foreground">{issue.name}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{issue.description}</p>
                </div>
                <ChevronDown
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>

              <div className="space-y-3 border-t border-border px-3 py-3">
                <div>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Explicação simulada
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground">
                    {issue.explanation}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Recomendação
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground">
                    {issue.recommendation}
                  </p>
                </div>
              </div>
            </details>
          </li>
        )
      })}
    </ul>
  )
}
