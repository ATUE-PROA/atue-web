import { Controller, useFormContext } from 'react-hook-form'

import { SectionCard } from '@/components/ui/section-card'
import { FormField } from '@/components/ui/form-field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  REPORT_FREQUENCY_OPTIONS,
  REPORT_LANGUAGE_OPTIONS,
  SETTINGS_CONTENT,
} from '@/content/settings'
import type { AccountSettingsValues } from '@/types/settings.types'

const { reports } = SETTINGS_CONTENT

export function ReportPreferencesSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<AccountSettingsValues>()

  return (
    <SectionCard title={reports.title} description={reports.description}>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={reports.languageLabel} error={errors.reports?.language?.message} required>
          {(field) => (
            <Controller
              control={control}
              name="reports.language"
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
                    className="h-11 w-full data-[size=default]:h-11"
                  >
                    <SelectValue placeholder={reports.languageLabel} />
                  </SelectTrigger>
                  <SelectContent>
                    {REPORT_LANGUAGE_OPTIONS.map((option) => (
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
          label={reports.frequencyLabel}
          error={errors.reports?.frequency?.message}
          required
        >
          {(field) => (
            <Controller
              control={control}
              name="reports.frequency"
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
                    className="h-11 w-full data-[size=default]:h-11"
                  >
                    <SelectValue placeholder={reports.frequencyLabel} />
                  </SelectTrigger>
                  <SelectContent>
                    {REPORT_FREQUENCY_OPTIONS.map((option) => (
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
      </div>
    </SectionCard>
  )
}
