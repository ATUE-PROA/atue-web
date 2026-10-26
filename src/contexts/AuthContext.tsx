import { createContext, useState, useContext, type ReactNode } from 'react';
import type { UserToken } from '../types/api';

interface AuthContextType {
  user: UserToken | null;
  signIn: (data: UserToken) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

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

export function useAuth() {
  return useContext(AuthContext);
}