import { Info } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { PROFILE_INPUT_CLASSES } from '@/components/profile/profile-styles'
import { SectionCard } from '@/components/ui/section-card'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { PROFILE_CONTENT } from '@/content/profile'
import type { AccountProfile } from '@/types/profile.types'

const { dpo } = PROFILE_CONTENT

export function DpoSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AccountProfile>()

  return (
    <SectionCard title={dpo.title} description={dpo.description}>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={dpo.fields.name.label} error={errors.dpo?.name?.message}>
          {(field) => (
            <Input
              {...field}
              autoComplete={dpo.fields.name.autoComplete}
              placeholder={dpo.fields.name.placeholder}
              className={PROFILE_INPUT_CLASSES}
              {...register('dpo.name')}
            />
          )}
        </FormField>

        <FormField label={dpo.fields.email.label} error={errors.dpo?.email?.message}>
          {(field) => (
            <Input
              {...field}
              type="email"
              autoComplete={dpo.fields.email.autoComplete}
              placeholder={dpo.fields.email.placeholder}
              className={PROFILE_INPUT_CLASSES}
              {...register('dpo.email')}
            />
          )}
        </FormField>
      </div>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
        {dpo.note}
      </p>
    </SectionCard>
  )
}
