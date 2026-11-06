import { ShieldAlert, ShieldCheck } from 'lucide-react'

import { SectionCard } from '@/components/ui/section-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
        <Label htmlFor="monitored-domain" className="text-sm font-medium text-foreground">
          {domainContent.fieldLabel}
        </Label>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            id="monitored-domain"
            value={domain.domain}
            readOnly
            aria-describedby={`${helpId} ${lastCheckedId}`}
            className="h-11 rounded-lg border-input bg-muted/40 text-foreground sm:flex-1"
          />

          <span
            className={cn(
              'inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
              domain.verified ? verifiedBadgeClasses : unverifiedBadgeClasses,
            )}
          >
            {domain.verified ? (
              <ShieldCheck aria-hidden="true" className="size-3.5" />
            ) : (
              <ShieldAlert aria-hidden="true" className="size-3.5" />
            )}
            {domain.verified ? domainContent.verifiedLabel : domainContent.unverifiedLabel}
          </span>
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
