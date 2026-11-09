import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Loader2, Save } from 'lucide-react'

import { CrossLinks } from '@/components/layout/cross-links'
import { ProductFooter } from '@/components/layout/product-footer'
import { ProductHeader } from '@/components/layout/product-header'
import { DangerSection } from '@/components/settings/DangerSection'
import { DomainSection } from '@/components/settings/DomainSection'
import { IntegrationsSection } from '@/components/settings/IntegrationsSection'
import { NotificationsSection } from '@/components/settings/NotificationsSection'
import { ReportPreferencesSection } from '@/components/settings/ReportPreferencesSection'
import { SecuritySection } from '@/components/settings/SecuritySection'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { Skeleton } from '@/components/ui/skeleton'
import { SETTINGS_CONTENT } from '@/content/settings'
import { SETTINGS_SHORTCUTS } from '@/content/navigation'
import { accountSettingsSchema } from '@/lib/settings'
import { getAccountSettings, updateAccountSettings } from '@/services/settings'
import type { AccountSettings, AccountSettingsValues } from '@/types/settings.types'

type LoadState = 'loading' | 'ready' | 'error'
type SaveResult = 'idle' | 'success' | 'error'

const defaultValues: AccountSettingsValues = {
  notifications: {
    emailAlerts: true,
    weeklySummary: false,
    criticalAlerts: true,
  },
  reports: {
    language: 'pt-BR',
    frequency: 'monthly',
  },
}

export function Settings() {
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [settings, setSettings] = useState<AccountSettings | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [saveResult, setSaveResult] = useState<SaveResult>('idle')

  const form = useForm<AccountSettingsValues>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  useEffect(() => {
    let isActive = true

    getAccountSettings()
      .then((data) => {
        if (!isActive) {
          return
        }

        setSettings(data)
        reset({
          notifications: data.notifications,
          reports: data.reports,
        })
        setLoadState('ready')
      })
      .catch(() => {
        if (isActive) {
          setLoadState('error')
        }
      })

    return () => {
      isActive = false
    }
  }, [reloadKey, reset])

  const onSubmit = async (values: AccountSettingsValues) => {
    setSaveResult('idle')

    try {
      const updated = await updateAccountSettings(values)
      setSettings(updated)
      reset({
        notifications: updated.notifications,
        reports: updated.reports,
      })
      setSaveResult('success')
    } catch {
      setSaveResult('error')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ProductHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-14">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {SETTINGS_CONTENT.title}
          </h1>
          <p className="mt-3 text-xs font-medium tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
            {SETTINGS_CONTENT.eyebrow}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {SETTINGS_CONTENT.description}
          </p>
        </header>

        <CrossLinks
          className="mt-6"
          ariaLabel="Atalhos das configurações"
          links={SETTINGS_SHORTCUTS}
        />

        {loadState === 'loading' ? (
          <div
            role="status"
            className="mt-10 space-y-3 rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <span className="sr-only">{SETTINGS_CONTENT.loading}</span>
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : null}

        {loadState === 'error' ? (
          <div className="mt-10 max-w-2xl">
            <FormAlert
              tone="error"
              title={SETTINGS_CONTENT.loadErrorTitle}
              description={SETTINGS_CONTENT.loadErrorDescription}
            />
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => {
                setLoadState('loading')
                setReloadKey((current) => current + 1)
              }}
            >
              {SETTINGS_CONTENT.retryLabel}
            </Button>
          </div>
        ) : null}

        {loadState === 'ready' && settings ? (
          <FormProvider {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-busy={isSubmitting}
              className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start"
            >
              <div className="space-y-6">
                <NotificationsSection />
                <SecuritySection />
                <DangerSection />
              </div>

              <div className="space-y-6">
                <DomainSection domain={settings.domain} />
                <ReportPreferencesSection />
                <IntegrationsSection initialIntegrations={settings.integrations} />

                <div>
                  {saveResult === 'success' ? (
                    <FormAlert
                      tone="success"
                      title={SETTINGS_CONTENT.actions.successTitle}
                      description={SETTINGS_CONTENT.actions.successDescription}
                    />
                  ) : null}

                  {saveResult === 'error' ? (
                    <FormAlert
                      tone="error"
                      title={SETTINGS_CONTENT.actions.errorTitle}
                      description={SETTINGS_CONTENT.actions.errorDescription}
                    />
                  ) : null}

                  <Button
                    type="submit"
                    variant="brand"
                    size="xl"
                    className="mt-4 w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 aria-hidden="true" className="animate-spin" />
                    ) : (
                      <Save aria-hidden="true" />
                    )}
                    {isSubmitting
                      ? SETTINGS_CONTENT.actions.savingLabel
                      : SETTINGS_CONTENT.actions.saveLabel}
                  </Button>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {SETTINGS_CONTENT.actions.demoNotice}
                  </p>
                </div>
              </div>
            </form>
          </FormProvider>
        ) : null}
      </main>

      <ProductFooter />
    </div>
  )
}
