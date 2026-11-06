import type { ApiProblemDetails } from '@/types/api'

const configuredBaseUrl = import.meta.env.VITE_API_URL ?? ''

export const API_BASE_URL = configuredBaseUrl.trim().replace(/\/+$/, '')

export function isApiConfigured(): boolean {
  return API_BASE_URL.length > 0
}

let authToken: string | null = null

export function setAuthToken(token: string | null): void {
  authToken = token
}

export function getAuthToken(): string | null {
  return authToken
}

export class HttpError extends Error {
  readonly status: number
  readonly problem: ApiProblemDetails | null

  constructor(message: string, status: number, problem: ApiProblemDetails | null) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.problem = problem
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions {
  method?: HttpMethod
  body?: unknown
  signal?: AbortSignal
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readProblemDetails(payload: unknown): ApiProblemDetails | null {
  if (!isRecord(payload)) {
    return null
  }

  const problem: ApiProblemDetails = {}

  if (typeof payload.title === 'string') {
    problem.title = payload.title
  }

  if (typeof payload.detail === 'string') {
    problem.detail = payload.detail
  }

  if (typeof payload.status === 'number') {
    problem.status = payload.status
  }

  return Object.keys(problem).length > 0 ? problem : null
}

/**
 * Executa uma requisição JSON tipada contra a Core API.
 *
 * O parse é recebido como função para validar dados não confiáveis em vez de
 * recorrer a type assertions.
 */
export async function requestJson<T>(
  path: string,
  parse: (payload: unknown) => T,
  options: RequestOptions = {},
): Promise<T> {
  if (!isApiConfigured()) {
    throw new HttpError(
      'A Core API não está configurada. Defina VITE_API_URL para usar a integração real.',
      0,
      null,
    )
  }

  const headers = new Headers({ Accept: 'application/json' })

  if (options.body !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`)
  }

  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? 'GET',
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: options.signal,
    })
  } catch {
    throw new HttpError(
      'Não foi possível conectar ao serviço. Verifique sua conexão e tente novamente.',
      0,
      null,
    )
  }

  if (!response.ok) {
    const errorPayload: unknown = await response.json().catch(() => null)
    const problem = readProblemDetails(errorPayload)

    throw new HttpError(
      problem?.detail ?? problem?.title ?? 'A requisição não foi concluída. Tente novamente.',
      response.status,
      problem,
    )
  }

  const text = await response.text()

  if (text.length === 0) {
    throw new HttpError('O serviço retornou uma resposta vazia.', response.status, null)
  }

  let payload: unknown

  try {
    payload = JSON.parse(text)
  } catch {
    throw new HttpError('O serviço retornou uma resposta inválida.', response.status, null)
  }

  return parse(payload)
}
