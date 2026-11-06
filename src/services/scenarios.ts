import { mockApplyDemoScenario, mockGetDemoScenarios } from '@/mocks/scenarios'
import type { DiagnosticReport } from '@/types/api'
import type { DemoScenario, DemoScenarioId } from '@/types/scenarios.types'

export function getDemoScenarios(): Promise<DemoScenario[]> {
  return mockGetDemoScenarios()
}

export function applyDemoScenario(scenarioId: DemoScenarioId): DiagnosticReport {
  return mockApplyDemoScenario(scenarioId)
}
