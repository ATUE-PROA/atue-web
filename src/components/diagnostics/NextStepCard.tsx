import { Link } from 'react-router-dom'

import { SEVERITY_STYLES } from '@/components/documents/severity'
import { Button } from '@/components/ui/button'
import { DIAGNOSTICS_CONTENT } from '@/content/diagnostics'
import { SEVERITY_CONTENT } from '@/content/documents'
import { sortIssuesBySeverity } from '@/lib/diagnostics'
import { cn } from '@/lib/utils'
import type { IssueCategory } from '@/types/api'

interface NextStepCardProps {
  issues: readonly IssueCategory[]
  className?: string
}

export function NextStepCard({ issues, className }: NextStepCardProps) {
  const priority = sortIssuesBySeverity(issues)[0]
  const { nextStep } = DIAGNOSTICS_CONTENT

  if (!priority) {
    return (
      <section className={cn('card-surface p-6 sm:p-8', className)}>
        <h2 className="text-label text-muted-foreground">{nextStep.title}</h2>
        <p className="mt-3 text-base font-semibold text-foreground">{nextStep.emptyTitle}</p>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {nextStep.emptyDescription}
        </p>
      </section>
    )
  }

  const severity = SEVERITY_STYLES[priority.severity]

  return (
    <section
      className={cn('card-surface p-6 sm:p-8', className)}
      aria-labelledby="proximo-passo-titulo"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="proximo-passo-titulo" className="text-label text-muted-foreground">
          {nextStep.title}
        </h2>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <span aria-hidden="true" className={cn('size-1.5 rounded-full', severity.dotClassName)} />
          {SEVERITY_CONTENT[priority.severity].label}
        </span>
      </div>

      <p className="mt-3 max-w-2xl text-lg font-semibold text-balance text-foreground">
        {priority.name}
      </p>
      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {priority.recommendation ?? priority.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Button asChild variant="brand" size="xl">
          <Link to="/documents">{nextStep.action}</Link>
        </Button>
        <a
          href="#pendencias"
          className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          {nextStep.viewAll}
        </a>
      </div>
    </section>
  )
}
