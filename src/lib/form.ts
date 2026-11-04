import { z } from 'zod'

import { isValidCnpj } from '@/lib/cnpj'
import { isValidDomain } from '@/lib/domain'
import type { FormValues } from '@/types/form.types'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export const formSchema: z.ZodType<FormValues, FormValues> = z.object({
  cnpj: z
    .string()
    .trim()
    .min(1, { message: 'Informe o CNPJ da empresa.' })
    .refine(isValidCnpj, { message: 'Informe um CNPJ válido.' }),
  url: z.string().trim().min(1, { message: 'Informe a URL do site.' }).refine(isValidDomain, {
    message: 'Informe uma URL válida, como https://exemplo.com.br.',
  }),
  empresa: z.string().trim().min(2, { message: 'Informe o nome da empresa.' }),
  email: z.string().trim().email({ message: 'Informe um e-mail válido.' }),
  documentos: z
    .custom<FileList | undefined>((value) => value === undefined || value instanceof FileList)
    .superRefine((value, ctx) => {
      if (!value || value.length === 0) {
        ctx.addIssue({ code: 'custom', message: 'Anexe pelo menos um documento.' })
        return
      }

      const files = Array.from(value)

      if (files.some((file) => !ACCEPTED_FILE_TYPES.includes(file.type))) {
        ctx.addIssue({ code: 'custom', message: 'Anexe arquivos PDF, DOC ou DOCX.' })
      }

      if (files.some((file) => file.size > MAX_FILE_SIZE)) {
        ctx.addIssue({ code: 'custom', message: 'Cada arquivo pode ter no máximo 10 MB.' })
      }
    }),
  observacoes: z
    .string()
    .trim()
    .max(1000, { message: 'As observações podem ter no máximo 1000 caracteres.' }),
})
