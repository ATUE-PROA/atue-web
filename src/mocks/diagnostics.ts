import { cloneDiagnosticReport, getStatusFromScore, summarizeIssues } from '@/lib/diagnostics'
import { delay } from '@/lib/documents'
import type { DiagnosticReport, IssueCategory } from '@/types/api'

const MOCK_DELAY_MS = 600
const MOCK_REQUEST_DELAY_MS = 1400

const INITIAL_ISSUES: IssueCategory[] = [
  {
    id: 'issue-privacy-policy',
    name: 'Política de Privacidade',
    category: 'Transparência',
    severity: 'alta',
    description: 'Documento não encontrado no site institucional.',
    explanation:
      'Sem uma política acessível, o titular não consegue entender quais dados são coletados, com qual finalidade e por quanto tempo são mantidos.',
    recommendation:
      'Publique uma Política de Privacidade em local visível e inclua finalidades, bases legais, compartilhamentos, retenção e canal do DPO.',
  },
  {
    id: 'issue-cookie-banner',
    name: 'Banner de cookies',
    category: 'Cookies e rastreamento',
    severity: 'media',
    description: 'O site não apresenta escolha de cookies antes do carregamento.',
    explanation:
      'Cookies de análise e marketing podem ser gravados sem que o visitante tenha uma opção clara de aceitar ou recusar.',
    recommendation:
      'Implemente um banner com opções granulares, registre a escolha e impeça o carregamento de cookies não essenciais antes do consentimento.',
  },
  {
    id: 'issue-retention',
    name: 'Prazo de retenção',
    category: 'Retenção de dados',
    severity: 'baixa',
    description: 'A política atual não informa prazos de retenção.',
    explanation:
      'A ausência de prazos dificulta a eliminação oportuna e a comprovação de que os dados não são mantidos além do necessário.',
    recommendation:
      'Defina prazos por categoria de dado e documente o critério usado para eliminar ou anonimizar registros ao final do período.',
  },
]

interface DiagnosticReportInput {
  id: string
  score: number
  createdAt: string
  issues: IssueCategory[]
}

export function buildDiagnosticReport(input: DiagnosticReportInput): DiagnosticReport {
  return {
    id: input.id,
    organizationId: 'org-456',
    score: input.score,
    status: getStatusFromScore(input.score),
    createdAt: input.createdAt,
    summary: summarizeIssues(input.issues),
    issues: input.issues.map((issue) => ({ ...issue })),
  }
}

let diagnosticState: DiagnosticReport = buildDiagnosticReport({
  id: 'diag-789',
  score: 72,
  createdAt: '2026-10-28T14:20:00.000Z',
  issues: INITIAL_ISSUES,
})

function hashText(value: string): number {
  let hash = 0

  for (const character of value) {
    const code = character.codePointAt(0) ?? 0
    hash = (hash * 31 + code) >>> 0
  }

  return hash
}

export async function mockGetDiagnostic(): Promise<DiagnosticReport> {
  await delay(MOCK_DELAY_MS)

  return cloneDiagnosticReport(diagnosticState)
}

/**
 * Simula `POST /v1/diagnostics` sem inventar dados externos: o score e a
 * quantidade de achados são derivados de forma determinística da URL informada,
 * reaproveitando os achados já catalogados no mock.
 */
export async function mockRequestDiagnostic(url: string): Promise<DiagnosticReport> {
  await delay(MOCK_REQUEST_DELAY_MS)

  const normalizedUrl = url.trim().toLowerCase()
  const digest = hashText(normalizedUrl)
  const score = 40 + (digest % 50)
  const issueCount = 1 + (digest % INITIAL_ISSUES.length)
  const report = buildDiagnosticReport({
    id: `diag-${digest.toString(16)}`,
    score,
    createdAt: new Date().toISOString(),
    issues: INITIAL_ISSUES.slice(0, issueCount),
  })

  diagnosticState = report

  return cloneDiagnosticReport(report)
}

export function setMockDiagnostic(report: DiagnosticReport): void {
  diagnosticState = cloneDiagnosticReport(report)
}

export function getMockDiagnosticSnapshot(): DiagnosticReport {
  return cloneDiagnosticReport(diagnosticState)
}
