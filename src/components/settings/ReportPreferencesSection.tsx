import { useFormContext } from 'react-hook-form'

import { SectionCard } from '@/components/ui/section-card'
import { FormField } from '@/components/ui/form-field'
import { NativeSelect } from '@/components/ui/native-select'
import {
  REPORT_FREQUENCY_OPTIONS,
  REPORT_LANGUAGE_OPTIONS,
  SETTINGS_CONTENT,
} from '@/content/settings'
import type { AccountSettingsValues } from '@/types/settings.types'

const { reports } = SETTINGS_CONTENT

export function ReportPreferencesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AccountSettingsValues>()

  return (
    <SectionCard title={reports.title} description={reports.description}>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={reports.languageLabel} error={errors.reports?.language?.message} required>
          {(field) => (
            <NativeSelect {...field} {...register('reports.language')}>
              {REPORT_LANGUAGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          )}
        </FormField>

        <FormField
          label={reports.frequencyLabel}
          error={errors.reports?.frequency?.message}
          required
        >
          {(field) => (
            <NativeSelect {...field} {...register('reports.frequency')}>
              {REPORT_FREQUENCY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          )}
        </FormField>
      </div>
    </SectionCard>
  )
}
