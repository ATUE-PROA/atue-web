import { useId, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SectionCardTone = 'default' | 'danger'

interface SectionCardProps {
  title: string
  description?: string
  children: ReactNode
  tone?: SectionCardTone
  id?: string
  className?: string
}

export function SectionCard({
  title,
  description,
  children,
  tone = 'default',
  id,
  className,
}: SectionCardProps) {
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
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      ) : null}

      <div className="mt-5">{children}</div>
    </section>
  )
}

export type { SectionCardProps }
