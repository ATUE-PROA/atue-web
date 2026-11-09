import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight, CreditCard, Files, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  DiagnosticRequestForm,
  type DiagnosticRequestStatus,
} from '@/components/diagnostics/DiagnosticRequestForm'
import { DemoScenarioCards } from '@/components/diagnostics/DemoScenarioCards'
import { ScanTerminal } from '@/components/diagnostics/ScanTerminal'
import { ScoreGauge } from '@/components/diagnostics/ScoreGauge'
import { FindingsList } from '@/components/documents/FindingsList'
import { ProductFooter } from '@/components/layout/product-footer'
import { ProductHeader } from '@/components/layout/product-header'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { Skeleton } from '@/components/ui/skeleton'
import { DIAGNOSTICS_CONTENT } from '@/content/diagnostics'
import { DASHBOARD_SHORTCUTS } from '@/content/navigation'
import { formatDocumentDateTime } from '@/lib/documents'
import { getScoreLevel } from '@/lib/diagnostics'
import { getDiagnostic, requestDiagnostic } from '@/services/diagnostic'
import { applyDemoScenario, getDemoScenarios } from '@/services/scenarios'
import type { DiagnosticReport } from '@/types/api'
import type { DemoScenario, DemoScenarioId } from '@/types/scenarios.types'

type LoadState = 'loading' | 'ready' | 'error'

const SHORTCUT_ICONS = {
  '/documents': Files,
  '/form': Upload,
  '/plans': CreditCard,
} as const

function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ProductHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>
      <ProductFooter />
    </div>
  )
}

export function Dashboard() {
  const [relatorio, setRelatorio] = useState<DiagnosticReport | null>(null)
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [reloadKey, setReloadKey] = useState(0)
  const [requestState, setRequestState] = useState<DiagnosticRequestStatus>('idle')
  const [scenarios, setScenarios] = useState<DemoScenario[]>([])
  const [scenarioState, setScenarioState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [scenarioReloadKey, setScenarioReloadKey] = useState(0)
  const [activeScenarioId, setActiveScenarioId] = useState<DemoScenarioId | null>(null)

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

  useEffect(() => {
    let isActive = true

    getDemoScenarios()
      .then((data) => {
        if (!isActive) {
          return
        }

        setScenarios(data)
        setScenarioState('ready')
      })
      .catch(() => {
        if (isActive) {
          setScenarioState('error')
        }
      })

    return () => {
      isActive = false
    }
  }, [scenarioReloadKey])

  const handleApplyScenario = (scenarioId: DemoScenarioId) => {
    try {
      const report = applyDemoScenario(scenarioId)
      setRelatorio(report)
      setActiveScenarioId(scenarioId)
      setRequestState('idle')
    } catch {
      setScenarioState('error')
    }
  }

  const handleRequestDiagnostic = async (url: string) => {
    if (requestState === 'running') {
      return
    }

    setRequestState('running')

    try {
      const nextReport = await requestDiagnostic(url)
      setRelatorio(nextReport)
      setActiveScenarioId(null)
      setRequestState('success')
    } catch {
      setRequestState('error')
    }
  }

  if (loadState === 'loading') {
    return (
      <DashboardShell>
        <div
          role="status"
          className="space-y-3 rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <span className="sr-only">Carregando diagnóstico...</span>
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </DashboardShell>
    )
  }

  if (loadState === 'error') {
    return (
      <DashboardShell>
        <FormAlert
          tone="error"
          title="Não foi possível carregar o diagnóstico"
          description="Tente novamente. Nenhum dado foi alterado."
        />
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => {
            setLoadState('loading')
            setReloadKey((current) => current + 1)
          }}
        >
          Tentar novamente
        </Button>
      </DashboardShell>
    )
  }

  const nivelScore = relatorio ? getScoreLevel(relatorio.score) : null

  return (
    <DashboardShell>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Painel de Controle
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Bem-vindo(a)!</p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          {nivelScore ? (
            <div
              className="flex items-center gap-2"
              role="group"
              aria-label={`Status geral: ${nivelScore.label}`}
            >
              <span className="text-sm font-medium text-foreground">Status geral:</span>
              <span
                aria-hidden="true"
                className={`h-4 w-4 rounded-full ${nivelScore.dotClassName}`}
              />
              <span className={`text-sm font-medium ${nivelScore.textClassName}`}>
                {nivelScore.label}
              </span>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="lg" className="w-fit">
              <Link to="/form">
                <Upload aria-hidden="true" />
                Enviar documentos
              </Link>
            </Button>

            <Button asChild variant="brand" size="lg" className="w-fit">
              <Link to="/documents">
                <Files aria-hidden="true" />
                Central de Documentos
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mt-8">
        <DemoScenarioCards
          scenarios={scenarios}
          activeScenarioId={activeScenarioId}
          status={scenarioState}
          onApply={handleApplyScenario}
          onRetry={() => {
            setScenarioState('loading')
            setScenarioReloadKey((current) => current + 1)
          }}
        />
      </div>

      <div className="mt-8">
        <DiagnosticRequestForm
          status={requestState}
          onSubmit={(url) => {
            void handleRequestDiagnostic(url)
          }}
        />

        {requestState === 'running' || requestState === 'success' ? (
          <ScanTerminal key={requestState} active={requestState === 'running'} />
        ) : null}
      </div>

      <section aria-labelledby="shortcuts-heading" className="mt-8">
        <h2
          id="shortcuts-heading"
          className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
        >
          Atalhos
        </h2>

        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {DASHBOARD_SHORTCUTS.map((shortcut) => {
            const Icon = SHORTCUT_ICONS[shortcut.to]

            return (
              <li key={shortcut.to}>
                <Link
                  to={shortcut.to}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-blue-600/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:hover:border-blue-400/40 dark:focus-visible:ring-blue-400/60"
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                    />
                  </span>
                  <span className="mt-3 text-sm font-medium text-foreground">{shortcut.label}</span>
                  <span className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {shortcut.description}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {relatorio?.degraded ? (
        <div className="mt-8">
          <FormAlert
            tone="info"
            title={DIAGNOSTICS_CONTENT.degraded.title}
            description={DIAGNOSTICS_CONTENT.degraded.description}
          />
        </div>
      ) : null}

      {relatorio ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-start">
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              {DIAGNOSTICS_CONTENT.score.title}
            </h2>
            <ScoreGauge score={relatorio.score} />
          </div>

          <section
            aria-labelledby="findings-heading"
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 id="findings-heading" className="text-lg font-semibold text-foreground">
                  {DIAGNOSTICS_CONTENT.findings.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {DIAGNOSTICS_CONTENT.findings.description}
                </p>
              </div>
              <Link
                to="/documents"
                className="text-sm font-medium text-blue-700 transition-colors hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none dark:text-blue-300 dark:hover:text-blue-200"
              >
                Ver central
              </Link>
            </div>

            <FindingsList
              className="mt-4"
              issues={relatorio.issues}
              emptyMessage={DIAGNOSTICS_CONTENT.findings.empty}
            />

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Última atualização em {formatDocumentDateTime(relatorio.createdAt)}.{' '}
              {DIAGNOSTICS_CONTENT.footerNote}
            </p>
          </section>
        </div>
      ) : (
        <section
          aria-labelledby="empty-diagnostic-heading"
          className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <h2 id="empty-diagnostic-heading" className="text-lg font-semibold text-foreground">
            {DIAGNOSTICS_CONTENT.empty.title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {DIAGNOSTICS_CONTENT.empty.description}
          </p>
        </section>
      )}
    </DashboardShell>
  )
}
