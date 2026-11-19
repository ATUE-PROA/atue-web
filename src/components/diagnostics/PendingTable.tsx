import { Link } from 'react-router-dom'

import { SEVERITY_STYLES } from '@/components/documents/severity'
import { Stagger } from '@/components/ui/reveal'
import { DIAGNOSTICS_CONTENT } from '@/content/diagnostics'
import { SEVERITY_CONTENT } from '@/content/documents'
import { sortIssuesBySeverity } from '@/lib/diagnostics'
import { cn } from '@/lib/utils'
import type { IssueCategory } from '@/types/api'

interface PendingTableProps {
  issues: readonly IssueCategory[]
  className?: string
}

export function PendingTable({ issues, className }: PendingTableProps) {
  const sorted = sortIssuesBySeverity(issues)
  const { pending } = DIAGNOSTICS_CONTENT

  return (
    <section
      id="pendencias"
      className={cn('card-surface scroll-mt-24 p-6 sm:p-8', className)}
      aria-labelledby="pendencias-titulo"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 id="pendencias-titulo" className="text-lg font-semibold text-foreground">
            {pending.title}
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{pending.description}</p>
        </div>
        <Link
          to="/documents"
          className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:underline"
        >
          {pending.viewAll}
        </Link>
      </div>

      {sorted.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">{pending.empty}</p>
      ) : (
        <Stagger items="tbody tr" className="mt-4">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{pending.title}</caption>
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th scope="col" className="w-24 py-2 pr-4 font-medium">
                  {pending.columns.severity}
                </th>
                <th scope="col" className="w-[32%] py-2 pr-4 font-medium">
                  {pending.columns.item}
                </th>
                <th scope="col" className="hidden py-2 font-medium sm:table-cell">
                  {pending.columns.recommendation}
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((issue) => (
                <tr key={issue.id} className="border-b border-border align-top last:border-b-0">
                  <td className="py-3 pr-4 text-xs whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <span
                        aria-hidden="true"
                        className={cn(
                          'size-1.5 rounded-full',
                          SEVERITY_STYLES[issue.severity].dotClassName,
                        )}
                      />
                      {SEVERITY_CONTENT[issue.severity].label}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-sm font-medium text-foreground">{issue.name}</td>
                  <td className="hidden py-3 text-sm leading-relaxed text-muted-foreground sm:table-cell">
                    {issue.recommendation ?? issue.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Stagger>
      )}
    </section>
  )
}
