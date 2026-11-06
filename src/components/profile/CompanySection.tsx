import { useFormContext } from 'react-hook-form'

import { PROFILE_INPUT_CLASSES } from '@/components/profile/profile-styles'
import { SectionCard } from '@/components/ui/section-card'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { NativeSelect } from '@/components/ui/native-select'
import { COMPANY_SECTOR_OPTIONS, PROFILE_CONTENT } from '@/content/profile'
import type { AccountProfile } from '@/types/profile.types'

const { company } = PROFILE_CONTENT

export function CompanySection() {
  const {
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
            <NativeSelect {...field} {...register('company.sector')}>
              {COMPANY_SECTOR_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
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
