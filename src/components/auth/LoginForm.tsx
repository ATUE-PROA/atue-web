import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { LOGIN_CONTENT } from '@/content/login'
import { useAuth } from '@/contexts/auth-context'
import { loginSchema } from '@/lib/login'
import { signIn } from '@/services/auth'
import type { LoginFormValues } from '@/types/login.types'

const inputClasses =
  'h-11 rounded-lg border-input text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40'

const {
  title,
  description,
  fields,
  submitLabel,
  submittingLabel,
  errorTitle,
  errorDescription,
  demoNotice,
} = LOGIN_CONTENT

export function LoginForm() {
  const navigate = useNavigate()
  const { signIn: startSession } = useAuth()
  const [hasError, setHasError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      senha: '',
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setHasError(false)

    try {
      const session = await signIn(values)
      startSession(session)
      navigate('/dashboard', { replace: true })
    } catch {
      setHasError(true)
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/5 sm:p-8 dark:shadow-2xl dark:shadow-black/30">
      <h1 id="login-form-title" className="text-xl font-semibold text-foreground">
        {title}
      </h1>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>

      {hasError ? (
        <FormAlert tone="error" title={errorTitle} description={errorDescription} />
      ) : null}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-busy={isSubmitting}
        aria-labelledby="login-form-title"
        className="mt-6 space-y-4"
      >
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

        <Button type="submit" variant="brand" size="xl" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </form>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{demoNotice}</p>
    </div>
  )
}
