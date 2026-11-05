import { mockGetDiagnostic } from '@/mocks/api'
import type { DiagnosticReport } from '@/types/api'

export function getDiagnostic(): Promise<DiagnosticReport> {
  return mockGetDiagnostic()
}
