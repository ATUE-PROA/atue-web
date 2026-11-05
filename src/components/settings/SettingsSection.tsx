import { useId, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SettingsSectionTone = 'default' | 'danger'

interface SettingsSectionProps {
  title: string
  description: string
  children: ReactNode
  tone?: SettingsSectionTone
  id?: string
  className?: string
}

export function SettingsSection({
  title,
  description,
  children,
  tone = 'default',
  id,
  className,
}: SettingsSectionProps) {
  const generatedId = useId()
  const headingId = id ?? generatedId

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'rounded-xl border border-border bg-card p-6 shadow-sm',
        tone === 'danger' && 'border-destructive/30',
        className,
      )}
    >
      <h2
        id={headingId}
        className={cn(
          'text-lg font-semibold tracking-tight',
          tone === 'danger' ? 'text-destructive' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <div className="mt-5">{children}</div>
    </section>
  )
}
