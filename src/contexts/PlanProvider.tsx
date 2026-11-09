import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { PLAN_FEATURES } from '@/content/plans'
import { PlanContext } from '@/contexts/plan-context'
import { hasPlanAccess } from '@/lib/plans'
import type { PlanFeatureId, PlanGateRequest, PlanId } from '@/types/plans.types'

export function PlanProvider({ children }: { children: ReactNode }) {
  const [activePlan, setActivePlan] = useState<PlanId | null>(null)
  const [gate, setGate] = useState<PlanGateRequest | null>(null)

  const canAccess = useCallback(
    (featureId: PlanFeatureId) => hasPlanAccess(activePlan, PLAN_FEATURES[featureId].requiredPlan),
    [activePlan],
  )

  const requestFeature = useCallback(
    (featureId: PlanFeatureId) => {
      const requiredPlan = PLAN_FEATURES[featureId].requiredPlan

      if (hasPlanAccess(activePlan, requiredPlan)) {
        return true
      }

      setGate({ kind: 'feature', featureId })

      return false
    },
    [activePlan],
  )

  const requestSubscription = useCallback((planId: PlanId) => {
    setGate({ kind: 'subscription', planId })
  }, [])

  const subscribe = useCallback((planId: PlanId) => {
    setActivePlan(planId)
    setGate(null)
  }, [])

  const resetPlan = useCallback(() => {
    setActivePlan(null)
    setGate(null)
  }, [])

  const dismissGate = useCallback(() => {
    setGate(null)
  }, [])

  const value = useMemo(
    () => ({
      activePlan,
      gate,
      canAccess,
      requestFeature,
      requestSubscription,
      subscribe,
      resetPlan,
      dismissGate,
    }),
    [
      activePlan,
      canAccess,
      dismissGate,
      gate,
      requestFeature,
      requestSubscription,
      resetPlan,
      subscribe,
    ],
  )

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
}
