import { useState } from 'react'
import { Loader2, Trash2 } from 'lucide-react'

import { SettingsSection } from '@/components/settings/SettingsSection'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { SETTINGS_CONTENT } from '@/content/settings'
import { requestAccountDeletion } from '@/services/settings'
import type { AccountDeletionRequest } from '@/types/settings.types'

const { danger } = SETTINGS_CONTENT

export function DangerSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [request, setRequest] = useState<AccountDeletionRequest | null>(null)
  const [hasError, setHasError] = useState(false)

  const handleConfirm = async () => {
    setIsSubmitting(true)
    setHasError(false)

    try {
      const deletionRequest = await requestAccountDeletion()
      setRequest(deletionRequest)
    } catch {
      setHasError(true)
    } finally {
      setIsSubmitting(false)
      setIsOpen(false)
    }
  }

  return (
    <SettingsSection title={danger.title} description={danger.description} tone="danger">
      <div className="space-y-4">
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="destructive" className="h-10 w-full sm:w-auto">
              <Trash2 aria-hidden="true" />
              {danger.deleteLabel}
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{danger.dialogTitle}</AlertDialogTitle>
              <AlertDialogDescription>{danger.dialogDescription}</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isSubmitting}>{danger.cancelLabel}</AlertDialogCancel>
              <AlertDialogAction
                disabled={isSubmitting}
                onClick={(event) => {
                  event.preventDefault()
                  void handleConfirm()
                }}
              >
                {isSubmitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
                {isSubmitting ? danger.confirmingLabel : danger.confirmLabel}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {request ? (
          <FormAlert
            tone="info"
            title={danger.successTitle}
            description={`${danger.successDescription} Protocolo simulado: ${request.protocol}.`}
          />
        ) : null}

        {hasError ? (
          <FormAlert tone="error" title={danger.errorTitle} description={danger.errorDescription} />
        ) : null}
      </div>
    </SettingsSection>
  )
}
