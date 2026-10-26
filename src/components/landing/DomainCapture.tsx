import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { domainSchema, normalizeDomain } from '@/lib/domain'
import type {
  DomainCaptureState,
  DomainFormValues,
} from '@/types/landing.types'

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
    navigate('/cadastro', {
      state: { domain: normalizeDomain(values.domain) } satisfies DomainCaptureState,
    })
  }

  return (
    <section id="capturar-dominio" className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-neutral-900/60 to-neutral-950 p-8 sm:p-12">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] text-blue-400 uppercase">
            Organize-se com a plataforma de conformidade
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Entenda, organize e prove a conformidade do seu negócio.
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 max-w-2xl">
          <div className="flex flex-col gap-2">
            <Label htmlFor="domain" className="text-neutral-200">
              Conecte o seu domínio
            </Label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="domain"
                placeholder="suaempresa.com.br"
                autoComplete="url"
                inputMode="url"
                spellCheck={false}
                className="h-11 flex-1 rounded-lg border-white/15 bg-white/5 text-white placeholder:text-neutral-500 focus-visible:border-blue-400 focus-visible:ring-blue-400/40"
                aria-invalid={Boolean(errors.domain)}
                aria-describedby={errors.domain ? 'domain-error' : undefined}
                {...register('domain')}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 rounded-lg bg-blue-600 px-6 font-medium text-white hover:bg-blue-500 focus-visible:ring-blue-400/60"
              >
                Avaliar meu site agora
              </Button>
            </div>
            {errors.domain ? (
              <p id="domain-error" role="alert" className="text-sm text-red-400">
                {errors.domain.message}
              </p>
            ) : null}
            <p className="text-xs text-neutral-500">
              Leva menos de um minuto. Você será direcionado para criar sua
              conta.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
