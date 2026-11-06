import type { AccountProfile } from '@/types/profile.types'

const MOCK_DELAY_MS = 800

function resolveAfter<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), MOCK_DELAY_MS)
  })
}

function cloneProfile(profile: AccountProfile): AccountProfile {
  return {
    personal: { ...profile.personal },
    contact: { ...profile.contact },
    company: { ...profile.company },
    dpo: { ...profile.dpo },
  }
}

let profileState: AccountProfile = {
  personal: {
    fullName: 'Carlos Andrade',
    role: 'Responsável de Conformidade',
  },
  contact: {
    email: 'carlos@suaempresa.com.br',
    phone: '+55 (11) 91234-5678',
  },
  company: {
    legalName: 'Sua Empresa Ltda.',
    cnpj: '12.345.678/0001-95',
    sector: 'technology',
    address: 'Av. Paulista, 1000 — São Paulo, SP',
    website: 'https://suaempresa.com.br',
  },
  dpo: {
    name: 'Ana Lima',
    email: 'dpo@suaempresa.com.br',
  },
}

export function mockGetProfile(): Promise<AccountProfile> {
  return resolveAfter(cloneProfile(profileState))
}

export function mockUpdateProfile(payload: AccountProfile): Promise<AccountProfile> {
  profileState = cloneProfile(payload)

  return resolveAfter(cloneProfile(profileState))
}
