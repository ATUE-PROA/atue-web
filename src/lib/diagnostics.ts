import { z } from 'zod'

import {
  InvalidApiPayloadError,
  isRecord,
  readOptionalString,
  readRequiredArray,
  readRequiredNumber,
  readRequiredString,
} from '@/lib/api'
import { isValidDomain } from '@/lib/domain'
import type {
  DiagnosticRequest,
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

export const SEVERITY_ORDER: readonly IssueSeverity[] = ['alta', 'media', 'baixa']

export interface ScoreLevel {
  label: string
  dotClassName: string
  textClassName: string
  barClassName: string
  chartColor: string
}

export interface IssueSeverityGroup {
  severity: IssueSeverity
  issues: IssueCategory[]
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

export const diagnosticRequestSchema: z.ZodType<DiagnosticRequest, DiagnosticRequest> = z.object({
  url: z.string().trim().min(1, { message: 'Informe a URL do site.' }).refine(isValidDomain, {
    message: 'Informe uma URL válida, como https://exemplo.com.br.',
  }),
})

export function groupIssuesBySeverity(issues: readonly IssueCategory[]): IssueSeverityGroup[] {
  return SEVERITY_ORDER.map((severity) => ({
    severity,
    issues: sortIssuesBySeverity(issues.filter((issue) => issue.severity === severity)),
  })).filter((group) => group.issues.length > 0)
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

function readSeverity(value: unknown): IssueSeverity {
  if (value === 'alta' || value === 'media' || value === 'baixa') {
    return value
  }

  throw new InvalidApiPayloadError(
    'A API retornou um achado sem severidade. O contrato esperado exige "alta", "media" ou "baixa".',
  )
}

function parseIssueCategory(payload: unknown): IssueCategory {
  if (!isRecord(payload)) {
    throw new InvalidApiPayloadError('A API retornou um achado inválido.')
  }

  return {
    id: readRequiredString(payload, 'id'),
    name: readRequiredString(payload, 'name'),
    category: readOptionalString(payload, 'category'),
    severity: readSeverity(payload.severity),
    description: readOptionalString(payload, 'description'),
    explanation: readOptionalString(payload, 'explanation'),
    recommendation: readOptionalString(payload, 'recommendation'),
  }
}

export function parseDiagnosticReport(payload: unknown): DiagnosticReport {
  if (!isRecord(payload)) {
    throw new InvalidApiPayloadError('A API retornou um diagnóstico inválido.')
  }

  const issues = readRequiredArray(payload, 'issues').map(parseIssueCategory)
  const score = readRequiredNumber(payload, 'score')
  const url = readOptionalString(payload, 'url')

  return {
    id: readRequiredString(payload, 'id'),
    organizationId: readRequiredString(payload, 'organizationId'),
    score,
    status: getStatusFromScore(score),
    createdAt: readRequiredString(payload, 'createdAt'),
    url: url || undefined,
    summary: summarizeIssues(issues),
    issues,
    degraded: payload.degraded === true,
  }
}
