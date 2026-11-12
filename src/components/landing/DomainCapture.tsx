import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PhotoFrame } from '@/components/ui/photo'
import { Reveal } from '@/components/ui/reveal'
import { domainSchema, normalizeDomain } from '@/lib/domain'
import { LANDING_CAPTURE, LANDING_PHOTOS } from '@/content/landing'
import type { DomainCaptureState, DomainFormValues } from '@/types/landing.types'

export default function DomainCapture() {
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
    <section id="avaliar" className="scroll-mt-16 border-t border-border/60 bg-muted/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="text-eyebrow text-blue-600 dark:text-blue-400">
              {LANDING_CAPTURE.eyebrow}
            </p>
            <h2 className="mt-4 text-section text-foreground">{LANDING_CAPTURE.title}</h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 max-w-xl">
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
                    className="h-11 flex-1 rounded-lg border-input text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40"
                    aria-invalid={Boolean(errors.domain)}
                    aria-describedby={errors.domain ? 'domain-error' : 'domain-help'}
                    {...register('domain')}
                  />
                  <Button type="submit" variant="brand" size="xl">
                    {LANDING_CAPTURE.submitLabel}
                  </Button>
                </div>
                {errors.domain ? (
                  <p id="domain-error" role="alert" className="text-sm text-destructive">
                    {errors.domain.message}
                  </p>
                ) : null}
                <p id="domain-help" className="text-sm leading-relaxed text-muted-foreground">
                  {LANDING_CAPTURE.helperText}
                </p>
                <Link
                  to="/login"
                  className="mt-1 w-fit text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  {LANDING_CAPTURE.loginLabel}
                </Link>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.08}>
            <PhotoFrame {...LANDING_PHOTOS.capture} frameClassName="aspect-[4/3]" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
