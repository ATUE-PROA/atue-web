import type {
  DiagnosticReport,
  DiagnosticStatus,
  DiagnosticSummary,
  IssueCategory,
  IssueSeverity,
} from '@/types/api'

const SEVERITY_WEIGHT: Record<IssueSeverity, number> = {
  alta: 0,
  media: 1,
  baixa: 2,
}

export interface ScoreLevel {
  label: string
  dotClassName: string
  textClassName: string
  barClassName: string
  chartColor: string
}

export function getScoreLevel(score: number): ScoreLevel {
  if (score < 25) {
    return {
      label: 'Crítico',
      dotClassName: 'bg-red-500',
      textClassName: 'text-red-600 dark:text-red-400',
      barClassName: 'bg-red-500',
      chartColor: '#ef4444',
    }
  }

  if (score < 50) {
    return {
      label: 'Atenção',
      dotClassName: 'bg-orange-500',
      textClassName: 'text-orange-700 dark:text-orange-400',
      barClassName: 'bg-orange-500',
      chartColor: '#f97316',
    }
  }

  if (score < 75) {
    return {
      label: 'Atenção',
      dotClassName: 'bg-yellow-500',
      textClassName: 'text-yellow-700 dark:text-yellow-400',
      barClassName: 'bg-yellow-500',
      chartColor: '#eab308',
    }
  }

  return {
    label: 'Conforme',
    dotClassName: 'bg-green-500',
    textClassName: 'text-green-700 dark:text-green-400',
    barClassName: 'bg-green-500',
    chartColor: '#22c55e',
  }
}

export function getStatusFromScore(score: number): DiagnosticStatus {
  if (score < 50) {
    return 'vermelho'
  }

  if (score < 75) {
    return 'amarelo'
  }

  return 'verde'
}

export function summarizeIssues(issues: readonly IssueCategory[]): DiagnosticSummary {
  const bySeverity: Record<IssueSeverity, number> = {
    alta: 0,
    media: 0,
    baixa: 0,
  }

  for (const issue of issues) {
    bySeverity[issue.severity] += 1
  }

  return { total: issues.length, bySeverity }
}

export function sortIssuesBySeverity(issues: readonly IssueCategory[]): IssueCategory[] {
  return [...issues].sort((first, second) => {
    const bySeverity = SEVERITY_WEIGHT[first.severity] - SEVERITY_WEIGHT[second.severity]

    if (bySeverity !== 0) {
      return bySeverity
    }

    return first.name.localeCompare(second.name, 'pt-BR')
  })
}

export function cloneDiagnosticReport(report: DiagnosticReport): DiagnosticReport {
  return {
    ...report,
    summary: {
      total: report.summary.total,
      bySeverity: { ...report.summary.bySeverity },
    },
    issues: report.issues.map((issue) => ({ ...issue })),
  }
}
