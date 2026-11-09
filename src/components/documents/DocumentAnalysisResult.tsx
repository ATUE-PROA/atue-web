import { FileDown, FileText, LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router-dom'

import { FindingsList } from '@/components/documents/FindingsList'
import { SEVERITY_STYLES } from '@/components/documents/severity'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { Progress } from '@/components/ui/progress'
import { SectionCard } from '@/components/ui/section-card'
import { DOCUMENTS_CONTENT, SEVERITY_CONTENT } from '@/content/documents'
import { DIAGNOSTICS_CONTENT } from '@/content/diagnostics'
import { getScoreLevel } from '@/lib/diagnostics'
import { formatDocumentDateTime, pluralize } from '@/lib/documents'
import { cn } from '@/lib/utils'
import type { IssueSeverity } from '@/types/api'
import type { DocumentAnalysisResult as DocumentAnalysisResultData } from '@/types/documents.types'

const SEVERITIES: readonly IssueSeverity[] = ['alta', 'media', 'baixa']

interface DocumentAnalysisResultProps {
  result: DocumentAnalysisResultData
}

export function DocumentAnalysisResult({ result }: DocumentAnalysisResultProps) {
  const { report, document } = result
  const level = getScoreLevel(report.score)
  const sourceLabel =
    document.source === 'local'
      ? DOCUMENTS_CONTENT.intake.sourceFileLabel
      : DOCUMENTS_CONTENT.intake.sourceSampleLabel

  return (
    <SectionCard
      title={DOCUMENTS_CONTENT.result.title}
      description={DOCUMENTS_CONTENT.result.description}
      className="animate-in fade-in slide-in-from-bottom-2 duration-500 motion-reduce:animate-none"
    >
      <div className="grid gap-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {DOCUMENTS_CONTENT.result.scoreLabel}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-tight text-foreground">
              {report.score}
            </span>
            <span className="text-sm text-muted-foreground">de 100</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span aria-hidden="true" className={cn('size-2.5 rounded-full', level.dotClassName)} />
            <span className={cn('text-sm font-medium', level.textClassName)}>{level.label}</span>
          </div>
          <Progress
            value={report.score}
            className="mt-2 h-2"
            indicatorClassName={level.barClassName}
          />
        </div>

        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {DOCUMENTS_CONTENT.result.documentLabel}
            </dt>
            <dd className="mt-0.5 flex items-start gap-2 font-medium text-foreground">
              <FileText
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
              />
              {document.name}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {DOCUMENTS_CONTENT.result.sourceLabel}
            </dt>
            <dd className="mt-0.5 text-foreground">{sourceLabel}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {DOCUMENTS_CONTENT.result.completedAtLabel}
            </dt>
            <dd className="mt-0.5 text-foreground">{formatDocumentDateTime(result.completedAt)}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {DOCUMENTS_CONTENT.result.findingsTitle}
            </dt>
            <dd className="mt-0.5 text-foreground">
              {report.summary.total}{' '}
              {pluralize(report.summary.total, 'achado identificado', 'achados identificados')}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {DOCUMENTS_CONTENT.result.summaryLabel}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {SEVERITIES.map((severity) => (
            <Badge
              key={severity}
              variant="outline"
              className={cn(
                'h-auto rounded-full px-3 py-1',
                SEVERITY_STYLES[severity].badgeClassName,
              )}
            >
              <span
                aria-hidden="true"
                className={cn('size-1.5 rounded-full', SEVERITY_STYLES[severity].dotClassName)}
              />
              {SEVERITY_CONTENT[severity].label}: {report.summary.bySeverity[severity]}
            </Badge>
          ))}
        </div>
      </div>

      <FormAlert
        tone="info"
        title={DOCUMENTS_CONTENT.result.demoNoticeTitle}
        description={DOCUMENTS_CONTENT.result.demoNoticeDescription}
      />

      {report.degraded ? (
        <FormAlert
          tone="info"
          title={DIAGNOSTICS_CONTENT.degraded.title}
          description={DIAGNOSTICS_CONTENT.degraded.description}
        />
      ) : null}

      <div className="mt-6">
        <h3 className="text-base font-semibold text-foreground">
          {DOCUMENTS_CONTENT.result.findingsTitle}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {DOCUMENTS_CONTENT.result.findingsDescription}
        </p>
        <FindingsList className="mt-3" issues={report.issues} />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
          <a href="#central-de-downloads">
            <FileDown aria-hidden="true" />
            {DOCUMENTS_CONTENT.result.downloadLink}
          </a>
        </Button>

        <Button asChild variant="brand" size="lg" className="w-full sm:w-auto">
          <Link to="/dashboard">
            <LayoutDashboard aria-hidden="true" />
            {DOCUMENTS_CONTENT.result.dashboardLink}
          </Link>
        </Button>
      </div>
    </SectionCard>
  )
}
