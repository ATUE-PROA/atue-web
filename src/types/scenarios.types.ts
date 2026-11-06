import type { DiagnosticReport } from '@/types/api'

export type DemoScenarioId = 'ecommerce' | 'clinica' | 'agencia'

export interface DemoScenario {
  id: DemoScenarioId
  companyName: string
  sector: string
  description: string
  website: string
  report: DiagnosticReport
}
