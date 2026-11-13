import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { LOGIN_CONTENT } from '@/content/login'
import { useAuth } from '@/contexts/auth-context'
import { usePlan } from '@/contexts/plan-context'
import { loginSchema } from '@/lib/login'
import { signIn, startDemoSession } from '@/services/auth'
import type { LoginFormValues } from '@/types/login.types'

const inputClasses =
  'h-11 rounded-lg border-input text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40'

const linkClasses =
  'rounded-md font-medium text-blue-600 dark:text-blue-400 transition-colors hover:text-blue-700 dark:hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background'

const subtleButtonClasses =
  'rounded-md text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors hover:text-blue-700 dark:hover:text-blue-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background'

const {
  title,
  description,
  fields,
  submitLabel,
  submittingLabel,
  errorTitle,
  errorDescription,
  recovery,
  demo,
  legal,
  demoNotice,
  signUpQuestion,
  signUpLabel,
  plansLabel,
} = LOGIN_CONTENT

export function LoginForm() {
  const navigate = useNavigate()
  const { signIn: startSession } = useAuth()
  const { activePlan, resetPlan, subscribe } = usePlan()
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
      resetPlan()
      navigate('/plans', { replace: true })
    } catch {
      setHasError(true)
    }
  }

  const handleDemoAccess = () => {
    startSession(startDemoSession())

    if (!activePlan) {
      subscribe('growth')
    }

    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <h2 id="login-form-title" className="text-xl font-semibold text-foreground">
        {title}
      </h2>
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

        <div className="flex justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button type="button" className={subtleButtonClasses}>
                {recovery.trigger}
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{recovery.title}</AlertDialogTitle>
                <AlertDialogDescription>{recovery.description}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction variant="brand">{recovery.action}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Button type="submit" variant="brand" size="xl" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </form>

      <div className="mt-4 space-y-2 border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          size="xl"
          className="h-auto min-h-11 w-full py-2.5 whitespace-normal"
          onClick={handleDemoAccess}
        >
          {demo.cta}
        </Button>
        <p className="text-center text-xs leading-relaxed text-muted-foreground">{demo.note}</p>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{demoNotice}</p>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {legal.intro}{' '}
        <Link to="/termos" className={linkClasses}>
          {legal.terms}
        </Link>{' '}
        {legal.conjunction}{' '}
        <Link to="/privacidade" className={linkClasses}>
          {legal.privacy}
        </Link>{' '}
        {legal.suffix}
      </p>

      <p className="mt-4 text-sm text-muted-foreground">
        {signUpQuestion}{' '}
        <Link to="/register" className={linkClasses}>
          {signUpLabel}
        </Link>
        {' · '}
        <Link to="/plans" className={linkClasses}>
          {plansLabel}
        </Link>
      </p>
    </div>
  )
}
