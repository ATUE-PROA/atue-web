import { mockGetDiagnostic } from '@/mocks/diagnostics'
import type { DiagnosticReport } from '@/types/api'

export function getDiagnostic(): Promise<DiagnosticReport> {
  return mockGetDiagnostic()
}
