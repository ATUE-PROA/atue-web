import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { domainSchema, normalizeDomain } from '@/lib/domain'
import { LANDING_CAPTURE } from '@/content/landing'
import type { DomainCaptureState, DomainFormValues } from '@/types/landing.types'

export default function DomainCapture() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DomainFormValues>({
    resolver: zodResolver(domainSchema),
    defaultValues: { domain: '' },
  })

  const onSubmit = (values: DomainFormValues) => {
    navigate('/register', {
      state: { domain: normalizeDomain(values.domain) } satisfies DomainCaptureState,
    })
  }

  return (
    <section
      id="avaliar"
      className="mx-auto w-full max-w-6xl scroll-mt-16 px-6 py-16 sm:py-20 lg:py-24"
    >
      <div className="rounded-2xl border border-border bg-gradient-to-br from-muted via-card to-background p-8 sm:p-12">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
            {LANDING_CAPTURE.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {LANDING_CAPTURE.title}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 max-w-2xl">
          <div className="flex flex-col gap-2">
            <Label htmlFor="domain" className="text-foreground">
              {LANDING_CAPTURE.label}
            </Label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="domain"
                placeholder={LANDING_CAPTURE.placeholder}
                autoComplete="url"
                inputMode="url"
                spellCheck={false}
                className="h-11 flex-1 rounded-lg text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40"
                aria-invalid={Boolean(errors.domain)}
                aria-describedby={errors.domain ? 'domain-error' : undefined}
                {...register('domain')}
              />
              <Button type="submit" variant="brand" size="xl" disabled={isSubmitting}>
                {LANDING_CAPTURE.submitLabel}
              </Button>
            </div>
            {errors.domain ? (
              <p id="domain-error" role="alert" className="text-sm text-destructive">
                {errors.domain.message}
              </p>
            ) : null}
            <p className="text-xs text-muted-foreground">{LANDING_CAPTURE.helperText}</p>
          </div>
        </form>
      </div>
    </section>
  )
}
