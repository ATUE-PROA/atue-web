import { InvalidApiPayloadError, isRecord, readRequiredRecord, readRequiredString } from '@/lib/api'
import type { UserToken } from '@/types/api'

export function parseUserToken(payload: unknown): UserToken {
  if (!isRecord(payload)) {
    throw new InvalidApiPayloadError('Resposta de autenticação inválida.')
  }

  const user = readRequiredRecord(payload, 'user')

  return {
    token: readRequiredString(payload, 'token'),
    user: {
      id: readRequiredString(user, 'id'),
      name: readRequiredString(user, 'name'),
      email: readRequiredString(user, 'email'),
      organizationId: readRequiredString(user, 'organizationId'),
    },
  }
}
