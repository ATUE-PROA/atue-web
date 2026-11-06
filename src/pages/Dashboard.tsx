import { useEffect, useState, type ReactNode } from 'react'
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts'
import { Files, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { FindingsList } from '@/components/documents/FindingsList'
import { ProductHeader } from '@/components/layout/product-header'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { formatDocumentDateTime } from '@/lib/documents'
import { getScoreLevel } from '@/lib/diagnostics'
import { getDiagnostic } from '@/services/diagnostic'
import type { DiagnosticReport } from '@/types/api'

type LoadState = 'loading' | 'ready' | 'error'

function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProductHeader />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
    </div>
  )
}

export function Dashboard() {
  const [relatorio, setRelatorio] = useState<DiagnosticReport | null>(null)
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [reloadKey, setReloadKey] = useState(0)

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

  if (loadState === 'loading') {
    return (
      <DashboardShell>
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground shadow-sm"
        >
          <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          Carregando diagnóstico...
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

  const score = relatorio?.score ?? 0
  const nivelScore = getScoreLevel(score)

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

          <Button asChild variant="outline" size="lg" className="w-fit">
            <Link to="/documents">
              <Files aria-hidden="true" />
              Central de Documentos
            </Link>
          </Button>
        </div>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-start">
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Score de Conformidade</h2>
          <div className="relative h-48 w-48">
            <RadialBarChart
              width={200}
              height={200}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={10}
              data={[{ name: 'Score', value: score, fill: nivelScore.chartColor }]}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar background dataKey="value" cornerRadius={10} />
            </RadialBarChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-semibold text-foreground">{score}</span>
              <span className="text-sm text-muted-foreground">de 100</span>
            </div>
          </div>
        </div>

        <section
          aria-labelledby="findings-heading"
          className="rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 id="findings-heading" className="text-lg font-semibold text-foreground">
                Achados e pendências
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Explicações e recomendações da análise simulada.
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
            issues={relatorio?.issues ?? []}
            emptyMessage="Nenhuma pendência encontrada no diagnóstico atual."
          />

          {relatorio ? (
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Última atualização em {formatDocumentDateTime(relatorio.createdAt)}. Dados de
              demonstração.
            </p>
          ) : null}
        </section>
      </div>
    </DashboardShell>
  )
}
