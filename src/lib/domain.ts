import { z } from 'zod'

import type { DomainFormValues } from '@/types/landing.types'

const DOMAIN_PATTERN = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/

export function normalizeDomain(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split(/[/?#]/, 1)[0]
    .replace(/\.+$/, '')
}

export const domainSchema: z.ZodType<DomainFormValues, DomainFormValues> = z.object({
  domain: z
    .string()
    .trim()
    .min(1, { message: 'Informe o domínio do seu site.' })
    .refine((value) => DOMAIN_PATTERN.test(normalizeDomain(value)), {
      message: 'Informe um domínio válido, como exemplo.com.br.',
    }),
})

export function readDomainState(state: unknown): string | null {
  if (typeof state !== 'object' || state === null || !('domain' in state)) {
    return null
  }

  const { domain } = state

  return typeof domain === 'string' && domain.length > 0 ? domain : null
}
