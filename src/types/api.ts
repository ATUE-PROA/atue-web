export type DiagnosticStatus = 'vermelho' | 'amarelo' | 'verde'

export type IssueSeverity = 'alta' | 'media' | 'baixa'

export interface ApiProblemDetails {
  title?: string
  detail?: string
  status?: number
}

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
  /** Endereço analisado, quando o serviço informa. */
  url?: string
  summary: DiagnosticSummary
  issues: IssueCategory[]
  /**
   * Indica que a análise foi concluída com resumo estático do catálogo
   * (por exemplo, quando o serviço de IA não respondeu).
   */
  degraded?: boolean
}

export interface DiagnosticRequest {
  url: string
}

export interface SignUpPayload {
  name: string
  email: string
  organizationName: string
  password: string
}

export interface SignInPayload {
  email: string
  password: string
}
