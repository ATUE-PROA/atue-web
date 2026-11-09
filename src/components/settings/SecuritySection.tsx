import { useState, type KeyboardEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'

import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { FormField } from '@/components/ui/form-field'
import { PasswordInput } from '@/components/ui/password-input'
import { SETTINGS_CONTENT } from '@/content/settings'
import { passwordChangeSchema } from '@/lib/settings'
import { changePassword } from '@/services/settings'
import type { PasswordChangeValues } from '@/types/settings.types'

type SubmissionResult = 'idle' | 'success' | 'error'

const inputClasses =
  'h-11 rounded-lg border-input text-foreground placeholder:text-muted-foreground focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40'

const { security } = SETTINGS_CONTENT

export function SecuritySection() {
  const [result, setResult] = useState<SubmissionResult>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordChangeValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  })

  const submitPassword = handleSubmit(async (values) => {
    setResult('idle')

    try {
      await changePassword(values)
      reset()
      setResult('success')
    } catch {
      setResult('error')
    }
  })

  const handlePasswordKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return
    }

    event.preventDefault()
    void submitPassword()
  }

  return (
    <SectionCard title={security.title} description={security.description}>
      <div className="space-y-4">
        <FormField
          label={security.fields.currentPassword.label}
          error={errors.currentPassword?.message}
          required
        >
          {(field) => (
            <PasswordInput
              {...field}
              placeholder={security.fields.currentPassword.placeholder}
              autoComplete={security.fields.currentPassword.autoComplete}
              className={inputClasses}
              onKeyDown={handlePasswordKeyDown}
              {...register('currentPassword')}
            />
          )}
        </FormField>

        <FormField
          label={security.fields.newPassword.label}
          error={errors.newPassword?.message}
          description={security.fields.newPassword.helpText}
          required
        >
          {(field) => (
            <PasswordInput
              {...field}
              placeholder={security.fields.newPassword.placeholder}
              autoComplete={security.fields.newPassword.autoComplete}
              className={inputClasses}
              onKeyDown={handlePasswordKeyDown}
              {...register('newPassword')}
            />
          )}
        </FormField>

        <Button
          type="button"
          variant="brand"
          size="xl"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
          onClick={() => {
            void submitPassword()
          }}
        >
          {isSubmitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
          {isSubmitting ? security.submittingLabel : security.submitLabel}
        </Button>

        {result === 'success' ? (
          <FormAlert
            tone="info"
            title={security.successTitle}
            description={security.successDescription}
          />
        ) : null}

        {result === 'error' ? (
          <FormAlert
            tone="error"
            title={security.errorTitle}
            description={security.errorDescription}
          />
        ) : null}

        <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">{security.twoFactorTitle}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {security.twoFactorDescription}
            </p>
          </div>
          <Badge
            variant="outline"
            className="h-auto w-fit rounded-full bg-muted px-3 py-1 text-muted-foreground"
          >
            {security.twoFactorStatus}
          </Badge>
        </div>
      </div>
    </SectionCard>
  )
}
