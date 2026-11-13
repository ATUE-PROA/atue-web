import { useId, type ReactNode } from 'react'

import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type SectionCardTone = 'default' | 'danger'
type SectionCardVariant = 'card' | 'plain'

interface SectionCardProps {
  title: string
  description?: string
  children: ReactNode
  tone?: SectionCardTone
  variant?: SectionCardVariant
  id?: string
  className?: string
}

export function SectionCard({
  title,
  description,
  children,
  tone = 'default',
  variant = 'card',
  id,
  className,
}: SectionCardProps) {
  const generatedId = useId()
  const headingId = id ?? generatedId

  if (variant === 'plain') {
    return (
      <section
        role="region"
        aria-labelledby={headingId}
        className={cn('border-t border-border pt-6', className)}
      >
        <h2
          id={headingId}
          className={cn(
            'text-section tracking-tight',
            tone === 'danger' ? 'text-destructive' : 'text-foreground',
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        <div className="mt-5">{children}</div>
      </section>
    )
  }

  return (
    <Card
      role="region"
      aria-labelledby={headingId}
      className={cn('gap-0 p-6', tone === 'danger' && 'ring-destructive/30', className)}
    >
      <CardHeader className="p-0">
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
          <CardDescription className="mt-2 leading-relaxed">{description}</CardDescription>
        ) : null}
      </CardHeader>

      <CardContent className="p-0 pt-5">{children}</CardContent>
    </Card>
  )
}

export type { SectionCardProps }
