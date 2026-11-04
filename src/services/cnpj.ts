import { normalizeCnpj } from '@/lib/cnpj'
import type { CnpjLookupData } from '@/types/cnpj.types'

const OPENCNPJ_API_URL = 'https://api.opencnpj.org'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function readString(payload: Record<string, unknown>, key: string): string {
  const value = payload[key]

  return typeof value === 'string' ? value.trim() : ''
}

export async function lookupCnpj(cnpj: string): Promise<CnpjLookupData | null> {
  const response = await fetch(`${OPENCNPJ_API_URL}/${normalizeCnpj(cnpj)}`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10_000),
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error('Não foi possível consultar o CNPJ.')
  }

  const payload: unknown = await response.json()

  if (!isRecord(payload)) {
    throw new Error('Resposta inválida da consulta de CNPJ.')
  }

  const razaoSocial = readString(payload, 'razao_social')
  const nomeFantasia = readString(payload, 'nome_fantasia')
  const email = readString(payload, 'email')

  if (!razaoSocial && !nomeFantasia) {
    return null
  }

  return { razaoSocial, nomeFantasia, email }
}
