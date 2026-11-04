import { z } from 'zod'

import type { LoginFormValues } from '@/types/login.types'

const PASSWORD_LETTER_PATTERN = /[A-Za-z]/
const PASSWORD_NUMBER_PATTERN = /\d/

export const loginSchema: z.ZodType<LoginFormValues, LoginFormValues> = z.object({
  email: z.string().trim().email({ message: 'Informe um e-mail válido.' }),
  senha: z
    .string()
    .min(8, { message: 'A senha precisa ter pelo menos 8 caracteres.' })
    .regex(PASSWORD_LETTER_PATTERN, {
      message: 'A senha precisa conter pelo menos uma letra.',
    })
    .regex(PASSWORD_NUMBER_PATTERN, {
      message: 'A senha precisa conter pelo menos um número.',
    }),
})
