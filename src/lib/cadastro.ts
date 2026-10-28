import { z } from 'zod'

import type { CadastroFormValues } from '@/types/cadastro.types'

const PASSWORD_LETTER_PATTERN = /[A-Za-z]/
const PASSWORD_NUMBER_PATTERN = /\d/

export const cadastroSchema: z.ZodType<CadastroFormValues, CadastroFormValues> = z.object({
  nome: z.string().trim().min(3, { message: 'O nome precisa ter pelo menos 3 caracteres.' }),
  email: z.string().trim().email({ message: 'Informe um e-mail válido.' }),
  empresa: z.string().trim().min(2, { message: 'Informe o nome da empresa.' }),
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
