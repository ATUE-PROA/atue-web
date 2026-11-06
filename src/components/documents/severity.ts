import { AlertCircle, AlertTriangle, Info, type LucideIcon } from 'lucide-react'

import type { IssueSeverity } from '@/types/api'

interface SeverityStyle {
  icon: LucideIcon
  badgeClassName: string
  dotClassName: string
}

export const SEVERITY_STYLES: Record<IssueSeverity, SeverityStyle> = {
  alta: {
    icon: AlertTriangle,
    badgeClassName:
      'border-red-600/30 bg-red-600/10 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300',
    dotClassName: 'bg-red-500',
  },
  media: {
    icon: AlertCircle,
    badgeClassName:
      'border-yellow-600/30 bg-yellow-500/10 text-yellow-800 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-300',
    dotClassName: 'bg-yellow-500',
  },
  baixa: {
    icon: Info,
    badgeClassName:
      'border-blue-600/30 bg-blue-600/10 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300',
    dotClassName: 'bg-blue-500',
  },
}
