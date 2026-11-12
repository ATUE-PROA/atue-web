import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { PublicFooter } from '@/components/layout/public-footer'
import { PublicHeader } from '@/components/layout/public-header'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { SectionCard } from '@/components/ui/section-card'
import { Textarea } from '@/components/ui/textarea'
import { CONTACT_CONTENT, LEGAL_BACK_LABEL, LEGAL_FOOTER } from '@/content/legal'
import { contactSchema, type ContactFormValues } from '@/lib/contact'

const backLinkClasses =
  'inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none'

const inputClasses =
  'h-11 rounded-lg border-input text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40'

export function Contact() {
  const { eyebrow, title, intro, formTitle, formDescription, fields, submitLabel, simulated } =
    CONTACT_CONTENT
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nome: '',
      email: '',
      mensagem: '',
    },
  })

  const onSubmit = () => {
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PublicHeader />

      <main id="conteudo" className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 sm:py-16">
        <Link to="/" className={backLinkClasses}>
          <ArrowLeft aria-hidden="true" className="size-4" />
          {LEGAL_BACK_LABEL}
        </Link>

        <p className="text-eyebrow mt-6 text-blue-600 dark:text-blue-400">{eyebrow}</p>
        <h1 className="text-display mt-4 text-foreground">{title}</h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>

        <div className="mt-8">
          <SectionCard id="contact-form-title" title={formTitle} description={formDescription}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-labelledby="contact-form-title"
              className="space-y-4"
            >
              <FormField label={fields.nome.label} error={errors.nome?.message} required>
                {(field) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder={fields.nome.placeholder}
                    autoComplete={fields.nome.autoComplete}
                    className={inputClasses}
                    {...register('nome')}
                  />
                )}
              </FormField>

              <FormField label={fields.email.label} error={errors.email?.message} required>
                {(field) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder={fields.email.placeholder}
                    autoComplete={fields.email.autoComplete}
                    spellCheck={false}
                    className={inputClasses}
                    {...register('email')}
                  />
                )}
              </FormField>

              <FormField label={fields.mensagem.label} error={errors.mensagem?.message} required>
                {(field) => (
                  <Textarea
                    {...field}
                    placeholder={fields.mensagem.placeholder}
                    className="rounded-lg border-input text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40"
                    {...register('mensagem')}
                  />
                )}
              </FormField>

              <Button type="submit" variant="brand" size="xl" className="w-full">
                {submitLabel}
              </Button>
            </form>

            {submitted ? (
              <FormAlert tone="info" title={simulated.title} description={simulated.description} />
            ) : null}
          </SectionCard>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {CONTACT_CONTENT.demoNote}
          </p>
          <Button asChild variant="outline" size="lg" className="shrink-0">
            <Link to="/login">{CONTACT_CONTENT.demoLinkLabel}</Link>
          </Button>
        </div>
      </main>

      <PublicFooter {...LEGAL_FOOTER} />
    </div>
  )
}
