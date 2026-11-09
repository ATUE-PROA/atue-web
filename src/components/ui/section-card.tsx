import { useId, type ReactNode } from 'react'

import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
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
