import { mockGetProfile, mockUpdateProfile } from '@/mocks/profile'
import type { AccountProfile } from '@/types/profile.types'

export function getProfile(): Promise<AccountProfile> {
  return mockGetProfile()
}

export function updateProfile(payload: AccountProfile): Promise<AccountProfile> {
  return mockUpdateProfile(payload)
}
