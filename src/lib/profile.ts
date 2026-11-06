import { z } from 'zod'

import { isValidCnpj } from '@/lib/cnpj'
import { isValidDomain } from '@/lib/domain'
import type { AccountProfile, CompanySector } from '@/types/profile.types'

const COMPANY_SECTORS = [
  'technology',
  'health',
  'finance',
  'retail',
  'education',
  'industry',
  'services',
  'other',
] as const satisfies readonly CompanySector[]

function countDigits(value: string): number {
  return value.replace(/\D/g, '').length
}

const trimmed = z.string().trim()

export const profileSchema: z.ZodType<AccountProfile, AccountProfile> = z.object({
  personal: z.object({
    fullName: trimmed
      .min(3, { message: 'O nome precisa ter pelo menos 3 caracteres.' })
      .max(120, { message: 'O nome pode ter no máximo 120 caracteres.' }),
    role: trimmed.max(80, { message: 'O cargo pode ter no máximo 80 caracteres.' }),
  }),
  contact: z.object({
    email: trimmed
      .min(1, { message: 'Informe um e-mail.' })
      .email({ message: 'Informe um e-mail válido.' }),
    phone: trimmed.refine(
      (value) => value === '' || (countDigits(value) >= 10 && countDigits(value) <= 13),
      { message: 'Informe um telefone com DDD.' },
    ),
  }),
  company: z.object({
    legalName: trimmed
      .min(3, { message: 'Informe a razão social da empresa.' })
      .max(120, { message: 'A razão social pode ter no máximo 120 caracteres.' }),
    cnpj: trimmed
      .min(1, { message: 'Informe o CNPJ da empresa.' })
      .refine(isValidCnpj, { message: 'Informe um CNPJ válido.' }),
    sector: z.enum(COMPANY_SECTORS, { message: 'Selecione um setor válido.' }),
    address: trimmed.max(200, { message: 'O endereço pode ter no máximo 200 caracteres.' }),
    website: trimmed.refine((value) => value === '' || isValidDomain(value), {
      message: 'Informe uma URL válida, como https://exemplo.com.br.',
    }),
  }),
  dpo: z.object({
    name: trimmed.max(120, { message: 'O nome do responsável pode ter no máximo 120 caracteres.' }),
    email: trimmed.refine((value) => value === '' || z.string().email().safeParse(value).success, {
      message: 'Informe um e-mail válido para o DPO.',
    }),
  }),
})

export function getProfileInitials(value: string): string {
  const parts = value.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return 'AT'
  }

  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''

  return `${first}${last}`.toUpperCase()
}
