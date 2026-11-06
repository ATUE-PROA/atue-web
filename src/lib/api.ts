export class InvalidApiPayloadError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidApiPayloadError'
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function readRequiredString(payload: Record<string, unknown>, key: string): string {
  const value = payload[key]

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new InvalidApiPayloadError(`Campo "${key}" ausente ou inválido na resposta da API.`)
  }

  return value.trim()
}

export function readOptionalString(payload: Record<string, unknown>, key: string): string {
  const value = payload[key]

  return typeof value === 'string' ? value.trim() : ''
}

export function readRequiredNumber(payload: Record<string, unknown>, key: string): number {
  const value = payload[key]

  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new InvalidApiPayloadError(`Campo "${key}" ausente ou inválido na resposta da API.`)
  }

  return value
}

export function readRequiredArray(payload: Record<string, unknown>, key: string): unknown[] {
  const value = payload[key]

  if (!Array.isArray(value)) {
    throw new InvalidApiPayloadError(`Campo "${key}" ausente ou inválido na resposta da API.`)
  }

  return value
}

export function readRequiredRecord(
  payload: Record<string, unknown>,
  key: string,
): Record<string, unknown> {
  const value = payload[key]

  if (!isRecord(value)) {
    throw new InvalidApiPayloadError(`Campo "${key}" ausente ou inválido na resposta da API.`)
  }

  return value
}
