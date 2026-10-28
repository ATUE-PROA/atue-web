import { createContext, useContext } from 'react'

import type { UserToken } from '@/types/api'

export interface AuthContextType {
  user: UserToken | null
  signIn: (data: UserToken) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }

  return context
}
