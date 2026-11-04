import { mockSignIn, mockSignUp } from '@/mocks/api'
import type { UserToken } from '@/types/api'
import type { CadastroFormValues } from '@/types/cadastro.types'
import type { LoginFormValues } from '@/types/login.types'

export function signUp(values: CadastroFormValues): Promise<UserToken> {
  return mockSignUp(values)
}

export function signIn(values: LoginFormValues): Promise<UserToken> {
  return mockSignIn(values)
}
