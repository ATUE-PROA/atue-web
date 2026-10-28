import { mockSignUp } from '@/mocks/api'
import type { UserToken } from '@/types/api'
import type { CadastroFormValues } from '@/types/cadastro.types'

export function signUp(values: CadastroFormValues): Promise<UserToken> {
  return mockSignUp(values)
}
