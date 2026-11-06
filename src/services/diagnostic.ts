import { parseDiagnosticReport } from '@/lib/diagnostics'
import { mockGetDiagnostic, mockRequestDiagnostic } from '@/mocks/diagnostics'
import { isApiConfigured, requestJson } from '@/services/http'
import type { DiagnosticReport } from '@/types/api'

/**
 * Retorna o diagnóstico atual da organização.
 *
 * Enquanto a Core API não expõe a leitura do histórico, a versão integrada
 * retorna `null` e a interface pede um novo diagnóstico em vez de exibir
 * dados simulados como se fossem reais.
 */
export async function getDiagnostic(): Promise<DiagnosticReport | null> {
  if (!isApiConfigured()) {
    return mockGetDiagnostic()
  }

  return null
}

export async function requestDiagnostic(url: string): Promise<DiagnosticReport> {
  if (!isApiConfigured()) {
    return mockRequestDiagnostic(url)
  }

  return requestJson('/v1/diagnostics', parseDiagnosticReport, {
    method: 'POST',
    body: { url },
  })
}
