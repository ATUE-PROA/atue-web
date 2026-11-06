import type { UserToken } from '@/types/api'
import type { CadastroFormValues } from '@/types/cadastro.types'
import type { FormSubmission, FormValues } from '@/types/form.types'
import type { LoginFormValues } from '@/types/login.types'

const MOCK_DELAY_MS = 2000

function resolveAfter<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), MOCK_DELAY_MS)
  })
}

export function mockSignUp(payload: CadastroFormValues): Promise<UserToken> {
  return resolveAfter({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockSignUpToken',
    user: {
      id: 'user-123',
      name: payload.nome.trim(),
      email: payload.email.trim(),
      organizationId: 'org-456',
    },
  })
}

export function mockSignIn(payload: LoginFormValues): Promise<UserToken> {
  return resolveAfter({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockSignInToken',
    user: {
      id: 'user-123',
      name: 'Usuário de demonstração',
      email: payload.email.trim(),
      organizationId: 'org-456',
    },
  })
}

export function mockSubmitForm(payload: FormValues): Promise<FormSubmission> {
  void payload // nada é persistido nesta simulação
  return resolveAfter({
    protocol: 'DEMO-2026',
    receivedAt: new Date().toISOString(),
  })
}
