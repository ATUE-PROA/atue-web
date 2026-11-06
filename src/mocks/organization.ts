import type { InstitutionalProfile } from '@/types/organization.types'

let institutionalProfile: InstitutionalProfile | null = null

export function saveMockInstitutionalProfile(
  profile: Omit<InstitutionalProfile, 'savedAt'>,
): InstitutionalProfile {
  institutionalProfile = {
    ...profile,
    savedAt: new Date().toISOString(),
  }

  return institutionalProfile
}

export function getMockInstitutionalProfile(): InstitutionalProfile | null {
  return institutionalProfile ? { ...institutionalProfile } : null
}
