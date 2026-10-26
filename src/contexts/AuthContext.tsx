import { useState, type ReactNode } from 'react';
import type { UserToken } from '../types/api';
// Contexto e hook ficam em auth-context.ts: .tsx só pode exportar componentes (Fast Refresh).
import { AuthContext } from './auth-context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserToken | null>(null);

  const signIn = (data: UserToken) => {
    setUser(data);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}