import { AlertCircle, CheckCircle2 } from 'lucide-react'

import { cn } from '@/lib/utils'

type FormAlertTone = 'success' | 'error'

interface FormAlertProps {
  tone: FormAlertTone
  title: string
  description: string
}

const toneStyles = {
  success: {
    container: 'border-green-500/30 bg-green-500/10',
    icon: 'text-green-300',
    title: 'text-green-100',
    description: 'text-green-200/90',
  },
  error: {
    container: 'border-red-500/30 bg-red-500/10',
    icon: 'text-red-300',
    title: 'text-red-100',
    description: 'text-red-200/90',
  },
} as const

export function FormAlert({ tone, title, description }: FormAlertProps) {
  const styles = toneStyles[tone]
  const Icon = tone === 'success' ? CheckCircle2 : AlertCircle

  return (
    <div
      role={tone === 'success' ? 'status' : 'alert'}
      className={cn('mt-6 flex items-start gap-3 rounded-lg border p-4', styles.container)}
    >
      <Icon aria-hidden="true" className={cn('mt-0.5 size-4 shrink-0', styles.icon)} />
      <div>
        <p className={cn('text-sm font-medium', styles.title)}>{title}</p>
        <p className={cn('mt-1 text-sm', styles.description)}>{description}</p>
      </div>
    </div>
  )
}
