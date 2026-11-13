import { useId } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SEVERITY_STYLES } from '@/components/documents/severity'
import { DOCUMENTS_CONTENT, SEVERITY_CONTENT } from '@/content/documents'
import { groupIssuesBySeverity } from '@/lib/diagnostics'
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
  const headingBaseId = useId()
  const groups = groupIssuesBySeverity(issues)

  if (groups.length === 0) {
    return <p className={cn('text-sm text-muted-foreground', className)}>{emptyMessage}</p>
  }

  return (
    <div className={cn('space-y-5', className)}>
      {groups.map((group) => {
        const headingId = `${headingBaseId}-${group.severity}`
        const severityStyle = SEVERITY_STYLES[group.severity]

        return (
          <section key={group.severity} aria-labelledby={headingId}>
            <h3
              id={headingId}
              className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground"
            >
              <span
                aria-hidden="true"
                className={cn('size-2 rounded-full', severityStyle.dotClassName)}
              />
              {SEVERITY_CONTENT[group.severity].label}
              <span className="text-xs font-medium text-muted-foreground">
                ({group.issues.length})
              </span>
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {SEVERITY_CONTENT[group.severity].description}
            </p>

            <Accordion type="multiple" className="mt-2">
              {group.issues.map((issue) => {
                return (
                  <AccordionItem
                    key={issue.id}
                    value={issue.id}
                    className="border-b border-border last:border-b-0"
                  >
                    <AccordionTrigger className="items-start gap-3 rounded-none px-0 py-4 hover:no-underline">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
                            <span
                              aria-hidden="true"
                              className={cn('size-1.5 rounded-full', severityStyle.dotClassName)}
                            />
                            {SEVERITY_CONTENT[issue.severity].label}
                          </span>
                          {issue.category ? (
                            <span className="text-xs text-muted-foreground">{issue.category}</span>
                          ) : null}
                        </div>
                        <p className="mt-1 font-medium text-foreground">{issue.name}</p>
                        {issue.description ? (
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {issue.description}
                          </p>
                        ) : null}
                      </div>
                    </AccordionTrigger>

                    {issue.explanation || issue.recommendation ? (
                      <AccordionContent className="space-y-3 border-t border-border py-3">
                        {issue.explanation ? (
                          <div>
                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                              Explicação simulada
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-foreground">
                              {issue.explanation}
                            </p>
                          </div>
                        ) : null}
                        {issue.recommendation ? (
                          <div>
                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                              Recomendação
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-foreground">
                              {issue.recommendation}
                            </p>
                          </div>
                        ) : null}
                      </AccordionContent>
                    ) : null}
                  </AccordionItem>
                )
              })}
            </Accordion>
          </section>
        )
      })}
    </div>
  )
}
