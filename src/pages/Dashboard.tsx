import { useEffect, useState, type ReactNode } from 'react'
import { FlaskConical, RefreshCcw } from 'lucide-react'

import {
  DiagnosticRequestForm,
  type DiagnosticRequestStatus,
} from '@/components/diagnostics/DiagnosticRequestForm'
import { NextStepCard } from '@/components/diagnostics/NextStepCard'
import { PendingTable } from '@/components/diagnostics/PendingTable'
import { ScoreIndex } from '@/components/diagnostics/ScoreIndex'
import { SEVERITY_STYLES } from '@/components/documents/severity'
import { ProductFooter } from '@/components/layout/product-footer'
import { ProductHeader } from '@/components/layout/product-header'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { Skeleton } from '@/components/ui/skeleton'
import { DIAGNOSTICS_CONTENT } from '@/content/diagnostics'
import { SEVERITY_CONTENT } from '@/content/documents'
import { SEVERITY_ORDER } from '@/lib/diagnostics'
import { cn } from '@/lib/utils'
import { getDiagnostic, requestDiagnostic } from '@/services/diagnostic'
import type { DiagnosticReport } from '@/types/api'

type LoadState = 'loading' | 'ready' | 'error'

const { page, empty, loadError, degraded, pending, footerNote } = DIAGNOSTICS_CONTENT

function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ProductHeader />
      <main id="conteudo" className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        {children}
      </main>
      <ProductFooter />
    </div>
  )
}

function SeveritySummary({ report, className }: { report: DiagnosticReport; className?: string }) {
  return (
    <section
      className={cn('card-surface flex flex-col p-6 sm:p-8', className)}
      aria-labelledby="resumo-titulo"
    >
      <h2 id="resumo-titulo" className="text-label text-muted-foreground">
        {pending.severityTitle}
      </h2>

      <p className="mt-4 flex items-baseline gap-2">
        <span className="text-5xl leading-none font-bold tracking-tight text-foreground tabular-nums">
          {report.issues.length}
        </span>
        <span className="text-sm text-muted-foreground">pendências</span>
      </p>

      <dl className="mt-5 space-y-3">
        {SEVERITY_ORDER.map((severity) => (
          <div
            key={severity}
            className="flex items-center justify-between border-b border-border pb-3 last:border-b-0 last:pb-0"
          >
            <dt className="flex items-center gap-2 text-sm text-muted-foreground">
              <span
                aria-hidden="true"
                className={cn('size-2 rounded-full', SEVERITY_STYLES[severity].dotClassName)}
              />
              {SEVERITY_CONTENT[severity].label}
            </dt>
            <dd className="text-xl font-semibold text-foreground tabular-nums">
              {report.summary.bySeverity[severity]}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        {footerNote}
      </p>
    </section>
  )
}

function DiagnosticSkeleton() {
  return (
    <div role="status" className="mt-8 grid gap-5 lg:grid-cols-12">
      <span className="sr-only">Carregando diagnóstico…</span>
      <div className="card-surface space-y-3 p-6 sm:p-8 lg:col-span-7">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-14 w-28" />
        <Skeleton className="h-2 w-full rounded-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="card-surface space-y-3 p-6 sm:p-8 lg:col-span-5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="card-surface h-28 lg:col-span-12" />
    </div>
  )
}

function EmptyDiagnostic() {
  return (
    <section className="card-surface mt-8 p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-foreground">{empty.title}</h2>
      <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {empty.description}
      </p>
      <Button asChild variant="brand" size="xl" className="mt-5">
        <a href="#novo-diagnostico">{empty.cta}</a>
      </Button>
    </section>
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
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <FlaskConical aria-hidden="true" className="size-3.5" />
            {page.demoBadge}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">{page.title}</h1>
        </div>

        <Button asChild variant="brand" size="xl" className="w-full sm:w-auto">
          <a href="#novo-diagnostico">
            <RefreshCcw aria-hidden="true" />
            {relatorio ? page.ctaUpdate : page.cta}
          </a>
        </Button>
      </header>

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

      {relatorio && loadState === 'ready' ? (
        <div
          key={`${relatorio.createdAt}-${relatorio.score}`}
          className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none"
        >
          {relatorio.degraded ? (
            <div className="mb-5">
              <FormAlert tone="info" title={degraded.title} description={degraded.description} />
            </div>
          ) : null}

          <div className="grid gap-5 lg:grid-cols-12">
            <ScoreIndex
              className="lg:col-span-7"
              score={relatorio.score}
              createdAt={relatorio.createdAt}
              url={relatorio.url}
            />
            <SeveritySummary className="lg:col-span-5" report={relatorio} />
            <NextStepCard className="lg:col-span-12" issues={relatorio.issues} />
            <PendingTable className="lg:col-span-12" issues={relatorio.issues} />
          </div>
        </div>
      ) : null}

      {loadState === 'ready' && !relatorio ? <EmptyDiagnostic /> : null}

      <DiagnosticRequestForm
        hasReport={relatorio !== null}
        status={requestState}
        onSubmit={(url) => {
          void handleRequestDiagnostic(url)
        }}
      />
    </DashboardShell>
  )
}
