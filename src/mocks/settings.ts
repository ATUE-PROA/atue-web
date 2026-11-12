import type {
  AccountDeletionRequest,
  AccountIntegration,
  AccountSettings,
  AccountSettingsValues,
  IntegrationId,
  PasswordChangeValues,
} from '@/types/settings.types'

const MOCK_DELAY_MS = 800

function resolveAfter<T>(value: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), MOCK_DELAY_MS)
  })
}

function cloneSettings(settings: AccountSettings): AccountSettings {
  return {
    notifications: { ...settings.notifications },
    reports: { ...settings.reports },
    domain: { ...settings.domain },
    integrations: settings.integrations.map((integration) => ({ ...integration })),
  }
}

let settingsState: AccountSettings = {
  notifications: {
    emailAlerts: true,
    weeklySummary: false,
    criticalAlerts: true,
  },
  reports: {
    language: 'pt-BR',
    frequency: 'monthly',
  },
  domain: {
    domain: 'suaempresa.com.br',
    verified: true,
    lastCheckedAt: '2026-11-04T09:14:00-03:00',
  },
  integrations: [
    {
      id: 'google-search-console',
      name: 'Google Search Console',
      status: 'available',
    },
    {
      id: 'slack',
      name: 'Slack',
      status: 'available',
    },
  ],
}

export function mockGetAccountSettings(): Promise<AccountSettings> {
  return resolveAfter(cloneSettings(settingsState))
}

export function mockUpdateAccountSettings(
  payload: AccountSettingsValues,
): Promise<AccountSettings> {
  settingsState = {
    ...settingsState,
    notifications: { ...payload.notifications },
    reports: { ...payload.reports },
  }

  return resolveAfter(cloneSettings(settingsState))
}

export function mockChangePassword(payload: PasswordChangeValues): Promise<void> {
  void payload // nenhuma senha é alterada nesta simulação

  return resolveAfter(undefined)
}

export function mockConnectIntegration(id: IntegrationId): Promise<AccountIntegration> {
  const integration = settingsState.integrations.find((item) => item.id === id)

  if (!integration) {
    throw new Error('Integração não encontrada.')
  }

  integration.status = 'connected'

  return resolveAfter({ ...integration })
}

export function mockRequestAccountDeletion(): Promise<AccountDeletionRequest> {
  return resolveAfter({ protocol: 'DEL-DEMO-2026' })
}
