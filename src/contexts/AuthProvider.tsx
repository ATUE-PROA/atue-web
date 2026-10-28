import { useState, type ReactNode } from 'react'

import { AuthContext } from '@/contexts/auth-context'
import type { UserToken } from '@/types/api'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserToken | null>(null)

  const signIn = (data: UserToken) => {
    setUser(data)
  }

  const signOut = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
}
