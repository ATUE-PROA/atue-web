import { useEffect, useState } from 'react'
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { mockGetDiagnostic } from '../mocks/api'
import type { DiagnosticReport } from '../types/api'

interface ScoreLevel {
  label: string
  dotClassName: string
  textClassName: string
  chartColor: string
}

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

export function Dashboard() {
  const [relatorio, setRelatorio] = useState<DiagnosticReport | null>(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregarDados() {
      const dados = await mockGetDiagnostic()
      setRelatorio(dados)
      setCarregando(false)
    }
    carregarDados()
  }, [])

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">Carregando diagnóstico...</div>
    )
  }

  const score = relatorio?.score ?? 0
  const nivelScore = getScoreLevel(score)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Painel de Controle</h1>
            <p className="text-muted-foreground">Bem-vindo(a)!</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Status Geral:</span>
            <span
              aria-hidden="true"
              className={`h-4 w-4 rounded-full ${nivelScore.dotClassName}`}
            />
            <span className={`text-sm font-medium ${nivelScore.textClassName}`}>
              {nivelScore.label}
            </span>
            <ThemeToggle />
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border rounded-xl p-6 flex flex-col items-center justify-center shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Score de Conformidade</h2>
            <div className="relative w-48 h-48">
              <RadialBarChart
                width={200}
                height={200}
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={10}
                data={[{ name: 'Score', value: relatorio?.score, fill: nivelScore.chartColor }]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={10} />
              </RadialBarChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{relatorio?.score}</span>
                <span className="text-sm text-muted-foreground">de 100</span>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Pendências Encontradas</h2>
            <ul className="space-y-3">
              {relatorio?.issues.map((issue) => (
                <li key={issue.id} className="p-3 bg-muted rounded-md border flex flex-col">
                  <span className="font-medium">{issue.name}</span>
                  <span className="text-sm text-muted-foreground">{issue.description}</span>
                </li>
              ))}
              {relatorio?.issues.length === 0 && (
                <p className="text-muted-foreground text-sm">Nenhuma pendência encontrada.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
