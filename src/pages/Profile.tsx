import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ProductFooter } from '@/components/layout/product-footer'
import { ProductHeader } from '@/components/layout/product-header'
import { CrossLinks } from '@/components/layout/cross-links'
import { CompanySection } from '@/components/profile/CompanySection'
import { ContactSection } from '@/components/profile/ContactSection'
import { DpoSection } from '@/components/profile/DpoSection'
import { PersonalDataSection } from '@/components/profile/PersonalDataSection'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { PROFILE_CONTENT } from '@/content/profile'
import { PROFILE_SHORTCUTS } from '@/content/navigation'
import { profileSchema } from '@/lib/profile'
import { getProfile, updateProfile } from '@/services/profile'
import type { AccountProfile } from '@/types/profile.types'

type LoadState = 'loading' | 'ready' | 'error'
type SaveResult = 'idle' | 'success' | 'error'
type SaveAction = 'card' | 'page'

const EMPTY_PROFILE: AccountProfile = {
  personal: {
    fullName: '',
    role: '',
  },
  contact: {
    email: '',
    phone: '',
  },
  company: {
    legalName: '',
    cnpj: '',
    sector: 'other',
    address: '',
    website: '',
  },
  dpo: {
    name: '',
    email: '',
  },
}

const { actions } = PROFILE_CONTENT

export function Profile() {
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [profile, setProfile] = useState<AccountProfile | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [saveResult, setSaveResult] = useState<SaveResult>('idle')
  const [saveAction, setSaveAction] = useState<SaveAction | null>(null)

  const form = useForm<AccountProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: EMPTY_PROFILE,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const isBusy = isSubmitting || saveAction !== null

  useEffect(() => {
    let isActive = true

    getProfile()
      .then((data) => {
        if (!isActive) {
          return
        }

        setProfile(data)
        reset(data)
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

  const onSubmit = async (values: AccountProfile) => {
    try {
      const updated = await updateProfile(values)
      setProfile(updated)
      reset(updated)
      setSaveResult('success')
    } catch {
      setSaveResult('error')
    }
  }

  const runSave = async (action: SaveAction) => {
    setSaveResult('idle')
    setSaveAction(action)

    try {
      await handleSubmit(onSubmit)()
    } finally {
      setSaveAction(null)
    }
  }

  const isSavingCard = isSubmitting && saveAction === 'card'
  const isSavingPage = isSubmitting && saveAction === 'page'

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ProductHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-14">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {PROFILE_CONTENT.title}
            </h1>
            <p className="mt-3 text-xs font-medium tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
              {PROFILE_CONTENT.eyebrow}
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-blue-400/60"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {PROFILE_CONTENT.backToSite}
          </Link>
        </header>

        <CrossLinks className="mt-6" ariaLabel="Atalhos do perfil" links={PROFILE_SHORTCUTS} />

        {loadState === 'loading' ? (
          <div
            role="status"
            className="mt-10 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground shadow-sm"
          >
            {PROFILE_CONTENT.loading}
          </div>
        ) : null}

        {loadState === 'error' ? (
          <div className="mt-10 max-w-2xl">
            <FormAlert
              tone="error"
              title={PROFILE_CONTENT.loadErrorTitle}
              description={PROFILE_CONTENT.loadErrorDescription}
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
              {PROFILE_CONTENT.retryLabel}
            </Button>
          </div>
        ) : null}

        {loadState === 'ready' && profile ? (
          <>
            {saveResult === 'success' ? (
              <div className="max-w-2xl">
                <FormAlert
                  tone="success"
                  title={actions.successTitle}
                  description={actions.successDescription}
                />
              </div>
            ) : null}

            {saveResult === 'error' ? (
              <div className="max-w-2xl">
                <FormAlert
                  tone="error"
                  title={actions.errorTitle}
                  description={actions.errorDescription}
                />
              </div>
            ) : null}

            <FormProvider {...form}>
              <form
                noValidate
                aria-busy={isBusy}
                onSubmit={(event) => {
                  event.preventDefault()
                  void runSave('page')
                }}
                className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start"
              >
                <div className="space-y-6">
                  <PersonalDataSection
                    onSave={() => {
                      void runSave('card')
                    }}
                    isSaving={isSavingCard}
                    isDisabled={isBusy}
                  />
                  <ContactSection />
                </div>

                <div className="space-y-6">
                  <CompanySection />
                  <DpoSection />

                  <div>
                    <Button
                      type="submit"
                      variant="brand"
                      size="xl"
                      className="w-full"
                      disabled={isBusy}
                    >
                      {isSavingPage ? (
                        <Loader2 aria-hidden="true" className="animate-spin" />
                      ) : (
                        <Save aria-hidden="true" />
                      )}
                      {isSavingPage ? actions.savingLabel : actions.saveLabel}
                    </Button>

                    <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
                      {actions.demoNotice}
                    </p>
                  </div>
                </div>
              </form>
            </FormProvider>
          </>
        ) : null}
      </main>

      <ProductFooter />
    </div>
  )
}
