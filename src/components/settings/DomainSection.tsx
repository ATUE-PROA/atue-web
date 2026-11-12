import { ShieldAlert, ShieldCheck } from 'lucide-react'

import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { SETTINGS_CONTENT } from '@/content/settings'
import { cn } from '@/lib/utils'
import { formatDateTime } from '@/lib/settings'
import type { MonitoredDomain } from '@/types/settings.types'

interface DomainSectionProps {
  domain: MonitoredDomain
}

const verifiedBadgeClasses =
  'border-green-600/30 bg-green-600/10 text-green-800 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300'

const unverifiedBadgeClasses =
  'border-yellow-600/30 bg-yellow-600/10 text-yellow-800 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-200'

const { domain: domainContent } = SETTINGS_CONTENT

export function DomainSection({ domain }: DomainSectionProps) {
  const lastChecked = formatDateTime(domain.lastCheckedAt)
  const helpId = 'monitored-domain-help'
  const lastCheckedId = 'monitored-domain-last-checked'

  return (
    <SectionCard title={domainContent.title} description={domainContent.description}>
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">{domainContent.fieldLabel}</p>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <p
            id="monitored-domain"
            aria-describedby={`${helpId} ${lastCheckedId}`}
            className="flex min-h-11 flex-1 items-center rounded-lg border border-border bg-muted/40 px-3 text-sm font-medium text-foreground"
          >
            {domain.domain}
          </p>

          <Badge
            variant="outline"
            className={cn(
              'h-auto w-fit rounded-full px-3 py-1',
              domain.verified ? verifiedBadgeClasses : unverifiedBadgeClasses,
            )}
          >
            {domain.verified ? (
              <ShieldCheck aria-hidden="true" />
            ) : (
              <ShieldAlert aria-hidden="true" />
            )}
            {domain.verified ? domainContent.verifiedLabel : domainContent.unverifiedLabel}
          </Badge>
        </div>

        <p id={helpId} className="text-xs leading-relaxed text-muted-foreground">
          {domainContent.readOnlyHelp}
        </p>
        <p id={lastCheckedId} className="text-xs leading-relaxed text-muted-foreground">
          {domainContent.lastCheckedPrefix} {lastChecked ?? domainContent.lastCheckedUnavailable}
        </p>
      </div>
    </SectionCard>
  )
}
