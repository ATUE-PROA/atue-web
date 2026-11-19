import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/ui/reveal'
import { LANDING_CAPTURE } from '@/content/landing'
import { domainSchema, normalizeDomain } from '@/lib/domain'
import type { DomainCaptureState, DomainFormValues } from '@/types/landing.types'

export default function CtaFinal() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    <section id="avaliar" className="mx-auto w-full max-w-7xl scroll-mt-24 px-6 pb-24">
      <div className="card-surface overflow-hidden p-8 sm:p-12 lg:p-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="max-w-xl text-section text-balance text-foreground">
              {LANDING_CAPTURE.title}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              {LANDING_CAPTURE.helperText}
            </p>
            <Link
              to="/login"
              className="mt-4 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {LANDING_CAPTURE.loginLabel}
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <label htmlFor="domain" className="text-label block text-muted-foreground">
                {LANDING_CAPTURE.label}
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  id="domain"
                  placeholder={LANDING_CAPTURE.placeholder}
                  autoComplete="url"
                  inputMode="url"
                  spellCheck={false}
                  aria-invalid={Boolean(errors.domain)}
                  aria-describedby={errors.domain ? 'domain-error' : 'domain-help'}
                  className="h-12 w-full flex-1 rounded-[16px] border border-input bg-card px-4 text-base text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/40"
                  {...register('domain')}
                />
                <Button type="submit" variant="brand" size="xl" className="h-12 shrink-0">
                  {LANDING_CAPTURE.submitLabel}
                </Button>
              </div>

              {errors.domain ? (
                <p id="domain-error" role="alert" className="mt-2 text-sm text-destructive">
                  {errors.domain.message}
                </p>
              ) : null}
              <p id="domain-help" className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Nenhum arquivo é enviado nesta etapa. Você pode revisar tudo antes de compartilhar.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
