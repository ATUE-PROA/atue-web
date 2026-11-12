import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthProofPanel } from '@/components/auth/AuthProofPanel'
import { LoginForm } from '@/components/auth/LoginForm'

export function Login() {
  return (
    <AuthLayout aside={<AuthProofPanel />}>
      <LoginForm />
    </AuthLayout>
  )
}
