import { useId, type ReactNode } from 'react'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface FormFieldControl {
  id: string
  'aria-invalid': boolean
  'aria-describedby'?: string
  'aria-required'?: true
}

interface FormFieldProps {
  label: string
  error?: string
  description?: string
  required?: boolean
  id?: string
  className?: string
  children: (control: FormFieldControl) => ReactNode
}

export function FormField({
  label,
  error,
  description,
  required = false,
  id,
  className,
  children,
}: FormFieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const descriptionId = description ? `${fieldId}-description` : undefined
  const errorId = error ? `${fieldId}-error` : undefined
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined

  const control: FormFieldControl = {
    id: fieldId,
    'aria-invalid': Boolean(error),
    'aria-describedby': describedBy,
    'aria-required': required ? true : undefined,
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={fieldId} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-blue-600 dark:text-blue-400">
            *
          </span>
        ) : null}
      </Label>

      {children(control)}

      {description ? (
        <p id={descriptionId} className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
