import { AuthLayout } from '@/components/auth/AuthLayout'
import { DocumentForm } from '@/components/form/DocumentForm'
import { FormBrandPanel } from '@/components/form/FormBrandPanel'

export function FormPage() {
  return (
    <AuthLayout aside={<FormBrandPanel />}>
      <DocumentForm />
    </AuthLayout>
  )
}
