import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
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
  'h-11 rounded-[16px] border-input text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40'

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
  const { label, placeholder, helpText, submitLabel, updateSubmitLabel, submittingLabel } =
    DIAGNOSTICS_CONTENT.request

  return (
    <section id="novo-diagnostico" aria-labelledby="diagnostic-request-title" className="mt-5">
      <form
        onSubmit={handleSubmit((values) => onSubmit(values.url.trim()))}
        noValidate
        aria-busy={isRunning}
        aria-labelledby="diagnostic-request-title"
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
      >
        <div className="sm:max-w-sm sm:flex-1">
          <label htmlFor="diagnostic-url" className="text-label block text-muted-foreground">
            {label}
          </label>
          <Input
            id="diagnostic-url"
            type="url"
            placeholder={placeholder}
            autoComplete="url"
            inputMode="url"
            spellCheck={false}
            className={`mt-1.5 ${inputClasses}`}
            aria-invalid={Boolean(errors.url)}
            aria-describedby={errors.url ? 'diagnostic-url-error' : 'diagnostic-url-help'}
            {...register('url')}
          />
        </div>

        <Button type="submit" variant="brand" size="xl" disabled={isRunning} className="shrink-0">
          {isRunning ? (
            <Loader2 aria-hidden="true" className="animate-spin" />
          ) : (
            <Search aria-hidden="true" />
          )}
          {isRunning ? submittingLabel : hasReport ? updateSubmitLabel : submitLabel}
        </Button>
      </form>

      {errors.url ? (
        <p id="diagnostic-url-error" role="alert" className="mt-2 text-sm text-destructive">
          {errors.url.message}
        </p>
      ) : (
        <p id="diagnostic-url-help" className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {helpText}
        </p>
      )}

      {status === 'success' ? (
        <div className="mt-3">
          <FormAlert
            tone="success"
            title={DIAGNOSTICS_CONTENT.request.successTitle}
            description={DIAGNOSTICS_CONTENT.request.successDescription}
          />
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="mt-3">
          <FormAlert
            tone="error"
            title={DIAGNOSTICS_CONTENT.request.errorTitle}
            description={DIAGNOSTICS_CONTENT.request.errorDescription}
          />
        </div>
      ) : null}
    </section>
  )
}
