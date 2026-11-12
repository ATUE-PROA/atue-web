import { useEffect, useState, type ReactNode } from 'react'
import { FlaskConical, Globe, Info, RefreshCcw, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  DiagnosticRequestForm,
  type DiagnosticRequestStatus,
} from '@/components/diagnostics/DiagnosticRequestForm'
import { PriorityActions } from '@/components/diagnostics/PriorityActions'
import { ScoreGauge } from '@/components/diagnostics/ScoreGauge'
import { FindingsList } from '@/components/documents/FindingsList'
import { SEVERITY_STYLES } from '@/components/documents/severity'
import { ProductFooter } from '@/components/layout/product-footer'
import { ProductHeader } from '@/components/layout/product-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { SectionCard } from '@/components/ui/section-card'
import { Skeleton } from '@/components/ui/skeleton'
import { DIAGNOSTICS_CONTENT } from '@/content/diagnostics'
import { SEVERITY_CONTENT } from '@/content/documents'
import { formatDocumentDateTime } from '@/lib/documents'
import { getScoreLevel, SEVERITY_ORDER } from '@/lib/diagnostics'
import { cn } from '@/lib/utils'
import { getDiagnostic, requestDiagnostic } from '@/services/diagnostic'
import type { DiagnosticReport } from '@/types/api'

type LoadState = 'loading' | 'ready' | 'error'

function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ProductHeader />
      <main id="conteudo" className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        {children}
      </main>
      <ProductFooter />
    </div>
  )
}

const { page, score, findings, empty, loadError, degraded, footerNote } = DIAGNOSTICS_CONTENT

function DashboardHeader({ report }: { report: DiagnosticReport | null }) {
  const level = report ? getScoreLevel(report.score) : null

  return (
    <header className="border-b border-border pb-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <Badge
            variant="outline"
            className="h-auto gap-1.5 rounded-full border-blue-600/30 bg-blue-600/10 px-3 py-1 text-xs text-foreground"
          >
            <FlaskConical aria-hidden="true" className="size-3" />
            {page.demoBadge}
          </Badge>

          <h1 className="mt-3 text-display text-foreground">{page.title}</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {page.description}
          </p>
        </div>

        <Button asChild variant="brand" size="xl" className="w-full sm:w-auto">
          <a href="#novo-diagnostico">
            <RefreshCcw aria-hidden="true" />
            {report ? page.ctaUpdate : page.cta}
          </a>
        </Button>
      </div>

      {report && level ? (
        <dl className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
          <div className="flex items-center gap-2">
            <dt className="text-muted-foreground">{page.statusLabel}:</dt>
            <dd className="flex items-center gap-1.5 font-medium">
              <span
                aria-hidden="true"
                className={cn('size-2.5 rounded-full', level.dotClassName)}
              />
              <span className={level.textClassName}>{level.label}</span>
            </dd>
          </div>

          {report.url ? (
            <div className="flex min-w-0 items-center gap-2">
              <dt className="text-muted-foreground">{page.urlLabel}:</dt>
              <dd className="flex min-w-0 items-center gap-1.5 font-medium text-foreground">
                <Globe aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
                <span className="break-all">{report.url}</span>
              </dd>
            </div>
          ) : null}

          <div className="flex items-center gap-2">
            <dt className="text-muted-foreground">{page.updatedLabel}</dt>
            <dd className="font-medium text-foreground">
              {formatDocumentDateTime(report.createdAt)}
            </dd>
          </div>
        </dl>
      ) : null}
    </header>
  )
}

function DiagnosticResults({ report }: { report: DiagnosticReport }) {
  const { summary } = report

  return (
    <div className="mt-8 space-y-6">
      {report.degraded ? (
        <FormAlert tone="info" title={degraded.title} description={degraded.description} />
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 md:items-start">
        <SectionCard title={score.title} description={score.description}>
          <div className="flex flex-col items-center">
            <ScoreGauge score={report.score} />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{score.scaleNote}</p>

          <div className="mt-4 flex gap-2 rounded-lg bg-muted/50 p-3 text-sm leading-relaxed text-foreground">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <p>{score.disclaimer}</p>
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <h3 className="text-sm font-medium text-foreground">{score.dimensionsTitle}</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
              {score.dimensions.map((dimension) => (
                <li key={dimension}>{dimension}</li>
              ))}
            </ul>
          </div>
        </SectionCard>

        <PriorityActions issues={report.issues} />
      </div>

      <SectionCard title={findings.title} description={findings.description}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div
            role="group"
            aria-label={findings.summaryLabel}
            className="flex flex-wrap gap-x-4 gap-y-1 text-sm"
          >
            {SEVERITY_ORDER.map((severity) => (
              <span
                key={severity}
                className="inline-flex items-center gap-1.5 text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className={cn('size-2 rounded-full', SEVERITY_STYLES[severity].dotClassName)}
                />
                {SEVERITY_CONTENT[severity].label}:{' '}
                <span className="font-medium text-foreground">{summary.bySeverity[severity]}</span>
              </span>
            ))}
          </div>

          <Link
            to="/documents"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors hover:text-blue-700 dark:hover:text-blue-300 focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            Ver central
          </Link>
        </div>

        <FindingsList className="mt-4" issues={report.issues} emptyMessage={findings.empty} />

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{footerNote}</p>
      </SectionCard>
    </div>
  )
}

function EmptyDiagnostic() {
  return (
    <SectionCard className="mt-8" title={empty.title} description={empty.description}>
      <Button asChild variant="brand" size="xl" className="w-full sm:w-auto">
        <a href="#novo-diagnostico">
          <Search aria-hidden="true" />
          {empty.cta}
        </a>
      </Button>
    </SectionCard>
  )
}

function DiagnosticSkeleton() {
  return (
    <div role="status" className="mt-8 space-y-6">
      <span className="sr-only">Carregando diagnóstico...</span>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3 rounded-xl bg-card p-6 ring-1 ring-border">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mx-auto size-40 rounded-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="space-y-3 rounded-xl bg-card p-6 ring-1 ring-border">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  )
}

export function Dashboard() {
  const [relatorio, setRelatorio] = useState<DiagnosticReport | null>(null)
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [reloadKey, setReloadKey] = useState(0)
  const [requestState, setRequestState] = useState<DiagnosticRequestStatus>('idle')

  useEffect(() => {
    let isActive = true

    getDiagnostic()
      .then((data) => {
        if (!isActive) {
          return
        }

        setRelatorio(data)
        setLoadState('ready')
      })
      .catch(() => {
        if (isActive) {
          setLoadState('error')
        }
      })

    return () => {
      isActive = false
    }
  }, [reloadKey])

  const handleRequestDiagnostic = async (url: string) => {
    if (requestState === 'running') {
      return
    }

    setRequestState('running')

    try {
      const nextReport = await requestDiagnostic(url)
      setRelatorio(nextReport)
      setRequestState('success')
    } catch {
      setRequestState('error')
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader report={relatorio} />

      {loadState === 'loading' ? <DiagnosticSkeleton /> : null}

      {loadState === 'error' ? (
        <div className="mt-8">
          <FormAlert tone="error" title={loadError.title} description={loadError.description} />
          <Button
            type="button"
            variant="outline"
            size="xl"
            className="mt-4"
            onClick={() => {
              setLoadState('loading')
              setReloadKey((current) => current + 1)
            }}
          >
            <RefreshCcw aria-hidden="true" />
            {loadError.retry}
          </Button>
        </div>
      ) : null}

      {relatorio && loadState !== 'loading' ? <DiagnosticResults report={relatorio} /> : null}

      {loadState === 'ready' && !relatorio ? <EmptyDiagnostic /> : null}

      <div className="mt-8">
        <DiagnosticRequestForm
          hasReport={relatorio !== null}
          status={requestState}
          onSubmit={(url) => {
            void handleRequestDiagnostic(url)
          }}
        />
      </div>
    </DashboardShell>
  )
}
