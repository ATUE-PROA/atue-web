export type ReportLanguage = 'pt-BR' | 'en' | 'es'

export type ReportFrequency = 'weekly' | 'monthly' | 'quarterly'

export type IntegrationId = 'google-search-console' | 'slack'

export type IntegrationStatus = 'available' | 'connected'

export interface NotificationPreferences {
  emailAlerts: boolean
  weeklySummary: boolean
  criticalAlerts: boolean
}

export interface ReportPreferences {
  language: ReportLanguage
  frequency: ReportFrequency
}

export interface MonitoredDomain {
  domain: string
  verified: boolean
  lastCheckedAt: string
}

export interface AccountIntegration {
  id: IntegrationId
  name: string
  status: IntegrationStatus
}

export interface AccountSettings {
  notifications: NotificationPreferences
  reports: ReportPreferences
  domain: MonitoredDomain
  integrations: AccountIntegration[]
}

export interface AccountSettingsValues {
  notifications: NotificationPreferences
  reports: ReportPreferences
}

export interface PasswordChangeValues {
  currentPassword: string
  newPassword: string
}

export interface AccountDeletionRequest {
  protocol: string
}
