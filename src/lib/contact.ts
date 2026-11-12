import { z } from 'zod'

export const contactSchema = z.object({
  nome: z.string().trim().min(2, { message: 'Informe seu nome.' }),
  email: z.string().trim().email({ message: 'Informe um e-mail válido.' }),
  mensagem: z
    .string()
    .trim()
    .min(10, { message: 'Escreva pelo menos 10 caracteres para explicar o contato.' }),
})

export type ContactFormValues = z.infer<typeof contactSchema>
