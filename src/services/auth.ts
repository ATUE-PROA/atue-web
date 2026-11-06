import { parseUserToken } from '@/lib/auth'
import { mockSignIn, mockSignUp } from '@/mocks/api'
import { isApiConfigured, requestJson, setAuthToken } from '@/services/http'
import type { SignInPayload, SignUpPayload, UserToken } from '@/types/api'
import type { CadastroFormValues } from '@/types/cadastro.types'
import type { LoginFormValues } from '@/types/login.types'

export async function signUp(values: CadastroFormValues): Promise<UserToken> {
  if (!isApiConfigured()) {
    const session = await mockSignUp(values)
    setAuthToken(session.token)

    return session
  }

  const payload: SignUpPayload = {
    name: values.nome.trim(),
    email: values.email.trim(),
    organizationName: values.empresa.trim(),
    password: values.senha,
  }

  const session = await requestJson('/v1/auth/register', parseUserToken, {
    method: 'POST',
    body: payload,
  })

  setAuthToken(session.token)

  return session
}

export async function signIn(values: LoginFormValues): Promise<UserToken> {
  if (!isApiConfigured()) {
    const session = await mockSignIn(values)
    setAuthToken(session.token)

    return session
  }

  const payload: SignInPayload = {
    email: values.email.trim(),
    password: values.senha,
  }

  const session = await requestJson('/v1/auth/login', parseUserToken, {
    method: 'POST',
    body: payload,
  })

  setAuthToken(session.token)

  return session
}

export function signOut(): void {
  setAuthToken(null)
}
