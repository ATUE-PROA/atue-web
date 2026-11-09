import { useState } from 'react'
import { CheckCircle2, Link2, Loader2, MessageSquare, Search } from 'lucide-react'

import { SectionCard } from '@/components/ui/section-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { SETTINGS_CONTENT } from '@/content/settings'
import { usePlan } from '@/contexts/plan-context'
import { connectIntegration } from '@/services/settings'
import { cn } from '@/lib/utils'
import type { AccountIntegration, IntegrationId, IntegrationStatus } from '@/types/settings.types'

interface IntegrationsSectionProps {
  initialIntegrations: AccountIntegration[]
}

type ConnectionResult = 'idle' | 'success' | 'error'

const integrationIcons = {
  'google-search-console': Search,
  slack: MessageSquare,
} satisfies Record<IntegrationId, typeof Search>

const { integrations: integrationsContent } = SETTINGS_CONTENT

const connectedBadgeClasses =
  'border-green-600/30 bg-green-600/10 text-green-800 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300'

function getStatusLabel(status: IntegrationStatus): string {
  return status === 'connected'
    ? integrationsContent.connectedLabel
    : integrationsContent.unavailableLabel
}

export function IntegrationsSection({ initialIntegrations }: IntegrationsSectionProps) {
  const { requestFeature } = usePlan()
  const [integrations, setIntegrations] = useState(initialIntegrations)
  const [connectingId, setConnectingId] = useState<IntegrationId | null>(null)
  const [result, setResult] = useState<ConnectionResult>('idle')

  const handleConnect = async (id: IntegrationId) => {
    if (!requestFeature('integrations')) {
      return
    }

    setConnectingId(id)
    setResult('idle')

    try {
      const updated = await connectIntegration(id)
      setIntegrations((current) =>
        current.map((integration) => (integration.id === id ? updated : integration)),
      )
      setResult('success')
    } catch {
      setResult('error')
    } finally {
      setConnectingId(null)
    }
  }

  return (
    <SectionCard title={integrationsContent.title} description={integrationsContent.description}>
      <ul className="divide-y divide-border">
        {integrations.map((integration) => {
          const content = integrationsContent.items[integration.id]
          const Icon = integrationIcons[integration.id]
          const isConnected = integration.status === 'connected'
          const isConnecting = connectingId === integration.id

          return (
            <li
              key={integration.id}
              className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{content.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {content.description}
                  </p>
                </div>
              </div>

              {isConnected ? (
                <Badge
                  variant="outline"
                  className={cn('h-auto w-fit rounded-full px-3 py-1', connectedBadgeClasses)}
                >
                  <CheckCircle2 aria-hidden="true" />
                  {getStatusLabel(integration.status)}
                </Badge>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 w-full sm:w-auto"
                  disabled={isConnecting}
                  onClick={() => {
                    void handleConnect(integration.id)
                  }}
                >
                  {isConnecting ? (
                    <Loader2 aria-hidden="true" className="animate-spin" />
                  ) : (
                    <Link2 aria-hidden="true" />
                  )}
                  {isConnecting
                    ? integrationsContent.connectingLabel
                    : integrationsContent.connectLabel}
                </Button>
              )}
            </li>
          )
        })}
      </ul>

      {result === 'success' ? (
        <FormAlert
          tone="info"
          title={integrationsContent.successTitle}
          description={integrationsContent.successDescription}
        />
      ) : null}

      {result === 'error' ? (
        <FormAlert
          tone="error"
          title={integrationsContent.errorTitle}
          description={integrationsContent.errorDescription}
        />
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        {integrationsContent.moreLabel}
      </p>
    </SectionCard>
  )
}
