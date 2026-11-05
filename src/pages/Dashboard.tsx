import { useEffect, useState, type ReactNode } from 'react'
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts'
import { Loader2 } from 'lucide-react'

import { ProductHeader } from '@/components/layout/product-header'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { getDiagnostic } from '@/services/diagnostic'
import type { DiagnosticReport } from '@/types/api'

interface ScoreLevel {
  label: string
  dotClassName: string
  textClassName: string
  chartColor: string
}

type LoadState = 'loading' | 'ready' | 'error'

function getScoreLevel(score: number): ScoreLevel {
  if (score < 25) {
    return {
      label: 'Crítico',
      dotClassName: 'bg-red-500',
      textClassName: 'text-red-600 dark:text-red-400',
      chartColor: '#ef4444',
    }
  }

  if (score < 50) {
    return {
      label: 'Atenção',
      dotClassName: 'bg-orange-500',
      textClassName: 'text-orange-700 dark:text-orange-400',
      chartColor: '#f97316',
    }
  }

  if (score < 75) {
    return {
      label: 'Atenção',
      dotClassName: 'bg-yellow-500',
      textClassName: 'text-yellow-700 dark:text-yellow-400',
      chartColor: '#eab308',
    }
  }

  return {
    label: 'Conforme',
    dotClassName: 'bg-green-500',
    textClassName: 'text-green-700 dark:text-green-400',
    chartColor: '#22c55e',
  }
}

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
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Painel de Controle
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Bem-vindo(a)!</p>
        </div>
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label={`Status geral: ${nivelScore.label}`}
        >
          <span className="text-sm font-medium text-foreground">Status geral:</span>
          <span aria-hidden="true" className={`h-4 w-4 rounded-full ${nivelScore.dotClassName}`} />
          <span className={`text-sm font-medium ${nivelScore.textClassName}`}>
            {nivelScore.label}
          </span>
        </div>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
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
              data={[{ name: 'Score', value: relatorio?.score ?? 0, fill: nivelScore.chartColor }]}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar background dataKey="value" cornerRadius={10} />
            </RadialBarChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-semibold text-foreground">
                {relatorio?.score ?? 0}
              </span>
              <span className="text-sm text-muted-foreground">de 100</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Pendências Encontradas</h2>
          <ul className="space-y-3">
            {relatorio?.issues.map((issue) => (
              <li
                key={issue.id}
                className="flex flex-col rounded-md border border-border bg-muted p-3"
              >
                <span className="font-medium text-foreground">{issue.name}</span>
                <span className="text-sm text-muted-foreground">{issue.description}</span>
              </li>
            ))}
            {relatorio?.issues.length === 0 && (
              <li className="text-sm text-muted-foreground">Nenhuma pendência encontrada.</li>
            )}
          </ul>
        </div>
      </div>
    </DashboardShell>
  )
}
