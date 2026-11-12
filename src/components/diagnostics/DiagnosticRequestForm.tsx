import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { DIAGNOSTICS_CONTENT } from '@/content/diagnostics'
import { diagnosticRequestSchema } from '@/lib/diagnostics'
import type { DiagnosticRequest } from '@/types/api'

export type DiagnosticRequestStatus = 'idle' | 'running' | 'success' | 'error'

interface DiagnosticRequestFormProps {
  onSubmit: (url: string) => void
  status: DiagnosticRequestStatus
  /** Muda a copy quando já existe um diagnóstico na tela. */
  hasReport?: boolean
}

const inputClasses =
  'h-11 rounded-lg border-input text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40'

const {
  title,
  updateTitle,
  description,
  updateDescription,
  label,
  placeholder,
  helpText,
  submitLabel,
  updateSubmitLabel,
  submittingLabel,
  successTitle,
  successDescription,
  errorTitle,
  errorDescription,
} = DIAGNOSTICS_CONTENT.request

export function DiagnosticRequestForm({
  onSubmit,
  status,
  hasReport = false,
}: DiagnosticRequestFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiagnosticRequest>({
    resolver: zodResolver(diagnosticRequestSchema),
    defaultValues: { url: '' },
  })

  const isRunning = status === 'running'

  return (
    <section
      id="novo-diagnostico"
      aria-labelledby="diagnostic-request-title"
      className="scroll-mt-24 rounded-xl bg-card p-6 ring-1 ring-border"
    >
      <h2 id="diagnostic-request-title" className="text-lg font-semibold text-foreground">
        {hasReport ? updateTitle : title}
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {hasReport ? updateDescription : description}
      </p>

      <form
        onSubmit={handleSubmit((values) => onSubmit(values.url.trim()))}
        noValidate
        aria-busy={isRunning}
        aria-labelledby="diagnostic-request-title"
        className="mt-5 space-y-4"
      >
        <FormField label={label} error={errors.url?.message} description={helpText} required>
          {(field) => (
            <Input
              {...field}
              type="url"
              placeholder={placeholder}
              autoComplete="url"
              inputMode="url"
              spellCheck={false}
              className={inputClasses}
              {...register('url')}
            />
          )}
        </FormField>

        <Button
          type="submit"
          variant="brand"
          size="xl"
          className="w-full sm:w-auto"
          disabled={isRunning}
        >
          {isRunning ? (
            <Loader2 aria-hidden="true" className="animate-spin" />
          ) : (
            <Search aria-hidden="true" />
          )}
          {isRunning ? submittingLabel : hasReport ? updateSubmitLabel : submitLabel}
        </Button>
      </form>

      {status === 'success' ? (
        <FormAlert tone="success" title={successTitle} description={successDescription} />
      ) : null}

      {status === 'error' ? (
        <FormAlert tone="error" title={errorTitle} description={errorDescription} />
      ) : null}
    </section>
  )
}
