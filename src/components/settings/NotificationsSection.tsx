import { Controller, useFormContext } from 'react-hook-form'

import { SettingsSection } from '@/components/settings/SettingsSection'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { SETTINGS_CONTENT } from '@/content/settings'
import type { AccountSettingsValues, NotificationPreferences } from '@/types/settings.types'

const notificationFields = [
  {
    name: 'emailAlerts',
    label: SETTINGS_CONTENT.notifications.items.emailAlerts,
  },
  {
    name: 'weeklySummary',
    label: SETTINGS_CONTENT.notifications.items.weeklySummary,
  },
  {
    name: 'criticalAlerts',
    label: SETTINGS_CONTENT.notifications.items.criticalAlerts,
  },
] as const satisfies readonly { name: keyof NotificationPreferences; label: string }[]

const { notifications } = SETTINGS_CONTENT

export function NotificationsSection() {
  const { control } = useFormContext<AccountSettingsValues>()

  return (
    <SettingsSection title={notifications.title} description={notifications.description}>
      <ul className="divide-y divide-border">
        {notificationFields.map((item) => {
          const fieldId = `notification-${item.name}`

          return (
            <li
              key={item.name}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <Label htmlFor={fieldId} className="text-sm font-medium text-foreground">
                {item.label}
              </Label>

              <Controller
                control={control}
                name={`notifications.${item.name}`}
                render={({ field }) => (
                  <Switch
                    id={fieldId}
                    name={field.name}
                    ref={field.ref}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </li>
          )
        })}
      </ul>
    </SettingsSection>
  )
}
