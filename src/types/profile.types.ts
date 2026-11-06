export type CompanySector =
  'technology' | 'health' | 'finance' | 'retail' | 'education' | 'industry' | 'services' | 'other'

export interface PersonalData {
  fullName: string
  role: string
}

export interface ContactData {
  email: string
  phone: string
}

export interface CompanyData {
  legalName: string
  cnpj: string
  sector: CompanySector
  address: string
  website: string
}

export interface DpoData {
  name: string
  email: string
}

export interface AccountProfile {
  personal: PersonalData
  contact: ContactData
  company: CompanyData
  dpo: DpoData
}
