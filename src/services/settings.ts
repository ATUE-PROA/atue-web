import {
  mockChangePassword,
  mockConnectIntegration,
  mockGetAccountSettings,
  mockRequestAccountDeletion,
  mockUpdateAccountSettings,
} from '@/mocks/settings'
import type {
  AccountDeletionRequest,
  AccountIntegration,
  AccountSettings,
  AccountSettingsValues,
  IntegrationId,
  PasswordChangeValues,
} from '@/types/settings.types'

export function getAccountSettings(): Promise<AccountSettings> {
  return mockGetAccountSettings()
}

export function updateAccountSettings(payload: AccountSettingsValues): Promise<AccountSettings> {
  return mockUpdateAccountSettings(payload)
}

export function changePassword(payload: PasswordChangeValues): Promise<void> {
  return mockChangePassword(payload)
}

export function connectIntegration(id: IntegrationId): Promise<AccountIntegration> {
  return mockConnectIntegration(id)
}

export function requestAccountDeletion(): Promise<AccountDeletionRequest> {
  return mockRequestAccountDeletion()
}
