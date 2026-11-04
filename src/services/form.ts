import { mockSubmitForm } from '@/mocks/api'

import type { FormSubmission, FormValues } from '@/types/form.types'

export function submitForm(values: FormValues): Promise<FormSubmission> {
  return mockSubmitForm(values)
}
