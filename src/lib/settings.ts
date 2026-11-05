import { z } from 'zod'

import type { AccountSettingsValues, PasswordChangeValues } from '@/types/settings.types'

const PASSWORD_LETTER_PATTERN = /[A-Za-z]/
const PASSWORD_NUMBER_PATTERN = /\d/

export const accountSettingsSchema: z.ZodType<AccountSettingsValues, AccountSettingsValues> =
  z.object({
    notifications: z.object({
      emailAlerts: z.boolean(),
      weeklySummary: z.boolean(),
      criticalAlerts: z.boolean(),
    }),
    reports: z.object({
      language: z.enum(['pt-BR', 'en', 'es'], {
        message: 'Selecione um idioma válido para os relatórios.',
      }),
      frequency: z.enum(['weekly', 'monthly', 'quarterly'], {
        message: 'Selecione uma periodicidade válida.',
      }),
    }),
  })

export const passwordChangeSchema: z.ZodType<PasswordChangeValues, PasswordChangeValues> = z
  .object({
    currentPassword: z.string().min(1, { message: 'Informe sua senha atual.' }),
    newPassword: z
      .string()
      .min(8, { message: 'A senha precisa ter pelo menos 8 caracteres.' })
      .regex(PASSWORD_LETTER_PATTERN, {
        message: 'A senha precisa conter pelo menos uma letra.',
      })
      .regex(PASSWORD_NUMBER_PATTERN, {
        message: 'A senha precisa conter pelo menos um número.',
      }),
  })
  .superRefine((values, ctx) => {
    if (values.currentPassword === values.newPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['newPassword'],
        message: 'A nova senha precisa ser diferente da senha atual.',
      })
    }
  })

export function formatDateTime(value: string): string | null {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}
