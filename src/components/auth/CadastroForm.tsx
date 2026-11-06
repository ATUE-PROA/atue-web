import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { CADASTRO_CONTENT } from '@/content/cadastro'
import { useAuth } from '@/contexts/auth-context'
import { usePlan } from '@/contexts/plan-context'
import { cadastroSchema } from '@/lib/cadastro'
import { signUp } from '@/services/auth'
import type { CadastroFormValues } from '@/types/cadastro.types'

type SubmissionResult = 'idle' | 'success' | 'error'

const inputClasses =
  'h-11 rounded-lg border-input text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40'

const {
  formTitle,
  formDescription,
  fields,
  submitLabel,
  submittingLabel,
  successTitle,
  successDescription,
  errorTitle,
  errorDescription,
  demoNotice,
} = CADASTRO_CONTENT

export function CadastroForm() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const { resetPlan } = usePlan()
  const [result, setResult] = useState<SubmissionResult>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormValues>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nome: '',
      email: '',
      empresa: '',
      senha: '',
    },
  })

  const isBusy = isSubmitting || result === 'success'

  useEffect(() => {
    if (result !== 'success') {
      return
    }

    const timer = window.setTimeout(() => {
      navigate('/plans', { replace: true })
    }, 900)

    return () => window.clearTimeout(timer)
  }, [navigate, result])

  const onSubmit = async (values: CadastroFormValues) => {
    setResult('idle')

    try {
      const session = await signUp(values)
      signIn(session)
      resetPlan()
      setResult('success')
    } catch {
      setResult('error')
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/5 sm:p-8 dark:shadow-2xl dark:shadow-black/30">
      <div>
        <h2 id="cadastro-form-title" className="text-xl font-semibold text-foreground">
          {formTitle}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{formDescription}</p>
      </div>

      {result === 'success' ? (
        <FormAlert tone="success" title={successTitle} description={successDescription} />
      ) : null}

      {result === 'error' ? (
        <FormAlert tone="error" title={errorTitle} description={errorDescription} />
      ) : null}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-busy={isSubmitting}
        aria-labelledby="cadastro-form-title"
        className="mt-6 space-y-4"
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

        <FormField label={fields.empresa.label} error={errors.empresa?.message} required>
          {(field) => (
            <Input
              {...field}
              type="text"
              placeholder={fields.empresa.placeholder}
              autoComplete={fields.empresa.autoComplete}
              className={inputClasses}
              {...register('empresa')}
            />
          )}
        </FormField>

        <FormField
          label={fields.senha.label}
          error={errors.senha?.message}
          description={fields.senha.helpText}
          required
        >
          {(field) => (
            <PasswordInput
              {...field}
              placeholder={fields.senha.placeholder}
              autoComplete={fields.senha.autoComplete}
              className={inputClasses}
              {...register('senha')}
            />
          )}
        </FormField>

        <Button type="submit" variant="brand" size="xl" className="w-full" disabled={isBusy}>
          {isSubmitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </form>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{demoNotice}</p>

      <p className="mt-4 text-sm text-muted-foreground">
        Já tem uma conta?{' '}
        <Link
          to="/login"
          className="rounded-md font-medium text-blue-700 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-blue-300 dark:hover:text-blue-200 dark:focus-visible:ring-blue-400/60"
        >
          Entrar
        </Link>
        {' · '}
        <Link
          to="/plans"
          className="rounded-md font-medium text-blue-700 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-blue-300 dark:hover:text-blue-200 dark:focus-visible:ring-blue-400/60"
        >
          Comparar planos
        </Link>
      </p>
    </div>
  )
}
