import { useFormContext, useWatch } from 'react-hook-form'

import { ProfileAvatar } from '@/components/profile/ProfileAvatar'
import { PROFILE_INPUT_CLASSES } from '@/components/profile/profile-styles'
import { SectionCard } from '@/components/ui/section-card'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { PROFILE_CONTENT } from '@/content/profile'
import type { AccountProfile } from '@/types/profile.types'

const { personal } = PROFILE_CONTENT

export function PersonalDataSection() {
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
      </div>
    </SectionCard>
  )
}
