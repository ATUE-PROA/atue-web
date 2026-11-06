import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts'

import { DIAGNOSTICS_CONTENT } from '@/content/diagnostics'
import { getScoreLevel } from '@/lib/diagnostics'
import { cn } from '@/lib/utils'

interface ScoreGaugeProps {
  score: number
  className?: string
}

export function ScoreGauge({ score, className }: ScoreGaugeProps) {
  const clampedScore = Math.min(100, Math.max(0, Math.round(score)))
  const level = getScoreLevel(clampedScore)
  const chartData = [{ name: 'score', value: clampedScore, fill: level.chartColor }]

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative h-48 w-48" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={10}
            data={chartData}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar background dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-semibold tracking-tight text-foreground">
            {clampedScore}
          </span>
          <span className="text-sm text-muted-foreground">{DIAGNOSTICS_CONTENT.score.caption}</span>
        </div>
      </div>

      <p className="mt-3 flex items-center gap-2 text-sm">
        <span aria-hidden="true" className={cn('size-2.5 rounded-full', level.dotClassName)} />
        <span className="text-muted-foreground">Nível:</span>
        <span className={cn('font-medium', level.textClassName)}>{level.label}</span>
      </p>

      <p className="sr-only">
        {DIAGNOSTICS_CONTENT.score.ariaLabel}: {clampedScore} de 100. Nível {level.label}.
      </p>
    </div>
  )
}
