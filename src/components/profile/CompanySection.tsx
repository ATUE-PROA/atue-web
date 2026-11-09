import { Controller, useFormContext } from 'react-hook-form'

import { PROFILE_INPUT_CLASSES } from '@/components/profile/profile-styles'
import { SectionCard } from '@/components/ui/section-card'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { COMPANY_SECTOR_OPTIONS, PROFILE_CONTENT } from '@/content/profile'
import { cn } from '@/lib/utils'
import type { AccountProfile } from '@/types/profile.types'

const { company } = PROFILE_CONTENT

export function CompanySection() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<AccountProfile>()

  return (
    <SectionCard title={company.title} description={company.description}>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label={company.fields.legalName.label}
          error={errors.company?.legalName?.message}
          required
          className="sm:col-span-2"
        >
          {(field) => (
            <Input
              {...field}
              autoComplete={company.fields.legalName.autoComplete}
              placeholder={company.fields.legalName.placeholder}
              className={PROFILE_INPUT_CLASSES}
              {...register('company.legalName')}
            />
          )}
        </FormField>

        <FormField label={company.fields.cnpj.label} error={errors.company?.cnpj?.message} required>
          {(field) => (
            <Input
              {...field}
              inputMode="numeric"
              placeholder={company.fields.cnpj.placeholder}
              className={PROFILE_INPUT_CLASSES}
              {...register('company.cnpj')}
            />
          )}
        </FormField>

        <FormField
          label={company.fields.sector.label}
          error={errors.company?.sector?.message}
          required
        >
          {(field) => (
            <Controller
              control={control}
              name="company.sector"
              render={({ field: controlledField }) => (
                <Select
                  name={controlledField.name}
                  value={controlledField.value}
                  onValueChange={controlledField.onChange}
                >
                  <SelectTrigger
                    id={field.id}
                    aria-invalid={field['aria-invalid']}
                    aria-describedby={field['aria-describedby']}
                    aria-required={field['aria-required']}
                    onBlur={controlledField.onBlur}
                    className={cn(PROFILE_INPUT_CLASSES, 'w-full data-[size=default]:h-11')}
                  >
                    <SelectValue placeholder={company.fields.sector.label} />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_SECTOR_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </FormField>

        <FormField
          label={company.fields.address.label}
          error={errors.company?.address?.message}
          className="sm:col-span-2"
        >
          {(field) => (
            <Input
              {...field}
              autoComplete={company.fields.address.autoComplete}
              placeholder={company.fields.address.placeholder}
              className={PROFILE_INPUT_CLASSES}
              {...register('company.address')}
            />
          )}
        </FormField>

        <FormField
          label={company.fields.website.label}
          error={errors.company?.website?.message}
          className="sm:col-span-2"
        >
          {(field) => (
            <Input
              {...field}
              type="url"
              autoComplete={company.fields.website.autoComplete}
              placeholder={company.fields.website.placeholder}
              className={PROFILE_INPUT_CLASSES}
              {...register('company.website')}
            />
          )}
        </FormField>
      </div>
    </SectionCard>
  )
}
