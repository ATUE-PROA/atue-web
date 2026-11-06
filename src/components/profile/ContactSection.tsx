import { useFormContext } from 'react-hook-form'

import { PROFILE_INPUT_CLASSES } from '@/components/profile/profile-styles'
import { SectionCard } from '@/components/ui/section-card'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { PROFILE_CONTENT } from '@/content/profile'
import type { AccountProfile } from '@/types/profile.types'

const { contact } = PROFILE_CONTENT

export function ContactSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AccountProfile>()

  return (
    <SectionCard title={contact.title} description={contact.description}>
      <div className="space-y-4">
        <FormField
          label={contact.fields.email.label}
          error={errors.contact?.email?.message}
          required
        >
          {(field) => (
            <Input
              {...field}
              type="email"
              autoComplete={contact.fields.email.autoComplete}
              placeholder={contact.fields.email.placeholder}
              className={PROFILE_INPUT_CLASSES}
              {...register('contact.email')}
            />
          )}
        </FormField>

        <FormField label={contact.fields.phone.label} error={errors.contact?.phone?.message}>
          {(field) => (
            <Input
              {...field}
              type="tel"
              autoComplete={contact.fields.phone.autoComplete}
              placeholder={contact.fields.phone.placeholder}
              className={PROFILE_INPUT_CLASSES}
              {...register('contact.phone')}
            />
          )}
        </FormField>
      </div>
    </SectionCard>
  )
}
