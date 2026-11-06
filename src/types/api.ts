export type DiagnosticStatus = 'vermelho' | 'amarelo' | 'verde'

export type IssueSeverity = 'alta' | 'media' | 'baixa'

export interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
    organizationId: string
  }
}

export interface Organization {
  id: string
  name: string
  cnpj: string
  sector: string
  createdAt: string
}

export interface IssueCategory {
  id: string
  name: string
  category: string
  severity: IssueSeverity
  description: string
  explanation: string
  recommendation: string
}

export interface DiagnosticSummary {
  total: number
  bySeverity: Record<IssueSeverity, number>
}

export interface DiagnosticReport {
  id: string
  organizationId: string
  score: number
  status: DiagnosticStatus
  createdAt: string
  summary: DiagnosticSummary
  issues: IssueCategory[]
}
