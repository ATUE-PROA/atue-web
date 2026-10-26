import { createContext, useContext } from 'react';
import type { UserToken } from '../types/api';

export interface AuthContextType {
  user: UserToken | null;
  signIn: (data: UserToken) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}
