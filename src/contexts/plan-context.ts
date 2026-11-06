import { createContext, useContext } from 'react'

import type { PlanFeatureId, PlanGateRequest, PlanId } from '@/types/plans.types'

export interface PlanContextType {
  activePlan: PlanId | null
  isDemo: boolean
  gate: PlanGateRequest | null
  canAccess: (featureId: PlanFeatureId) => boolean
  requestFeature: (featureId: PlanFeatureId) => boolean
  requestSubscription: (planId: PlanId) => void
  startDemo: () => void
  subscribe: (planId: PlanId) => void
  resetPlan: () => void
  dismissGate: () => void
}

export const PlanContext = createContext<PlanContextType | null>(null)

export function usePlan(): PlanContextType {
  const context = useContext(PlanContext)

  if (!context) {
    throw new Error('usePlan deve ser usado dentro de PlanProvider')
  }

  return context
}
