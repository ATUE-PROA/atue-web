import { useFormContext, useWatch } from 'react-hook-form'
import { Loader2 } from 'lucide-react'

import { ProfileAvatar } from '@/components/profile/ProfileAvatar'
import { PROFILE_INPUT_CLASSES } from '@/components/profile/profile-styles'
import { SectionCard } from '@/components/ui/section-card'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { PROFILE_CONTENT } from '@/content/profile'
import type { AccountProfile } from '@/types/profile.types'

interface PersonalDataSectionProps {
  onSave: () => void
  isSaving: boolean
  isDisabled: boolean
}

const { personal } = PROFILE_CONTENT

export function PersonalDataSection({ onSave, isSaving, isDisabled }: PersonalDataSectionProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<AccountProfile>()

  const fullName = useWatch({ control, name: 'personal.fullName' })

  return (
    <SectionCard title={personal.title}>
      <div className="space-y-5">
        <ProfileAvatar name={fullName || 'ATUE'} />

        <FormField
          label={personal.fields.fullName.label}
          error={errors.personal?.fullName?.message}
          required
        >
          {(field) => (
            <Input
              {...field}
              autoComplete={personal.fields.fullName.autoComplete}
              placeholder={personal.fields.fullName.placeholder}
              className={PROFILE_INPUT_CLASSES}
              {...register('personal.fullName')}
            />
          )}
        </FormField>

        <FormField label={personal.fields.role.label} error={errors.personal?.role?.message}>
          {(field) => (
            <Input
              {...field}
              autoComplete={personal.fields.role.autoComplete}
              placeholder={personal.fields.role.placeholder}
              className={PROFILE_INPUT_CLASSES}
              {...register('personal.role')}
            />
          )}
        </FormField>

        <Button type="button" variant="brand" size="xl" disabled={isDisabled} onClick={onSave}>
          {isSaving ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
          {isSaving ? personal.savingLabel : personal.saveLabel}
        </Button>
      </div>
    </SectionCard>
  )
}
