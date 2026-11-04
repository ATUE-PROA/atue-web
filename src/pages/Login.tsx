import { AuthCenteredLayout } from '@/components/auth/AuthLayout'
import { LoginForm } from '@/components/auth/LoginForm'

export function Login() {
  return (
    <AuthCenteredLayout>
      <LoginForm />
    </AuthCenteredLayout>
  )
}
