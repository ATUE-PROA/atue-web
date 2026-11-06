import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { PLAN_FEATURES } from '@/content/plans'
import { PlanContext } from '@/contexts/plan-context'
import { hasPlanAccess } from '@/lib/plans'
import type { PlanFeatureId, PlanGateRequest, PlanId } from '@/types/plans.types'

export function PlanProvider({ children }: { children: ReactNode }) {
  const [activePlan, setActivePlan] = useState<PlanId | null>(null)
  const [isDemo, setIsDemo] = useState(false)
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

  const startDemo = useCallback(() => {
    setActivePlan('start')
    setIsDemo(true)
    setGate(null)
  }, [])

  const subscribe = useCallback((planId: PlanId) => {
    setActivePlan(planId)
    setIsDemo(false)
    setGate(null)
  }, [])

  const resetPlan = useCallback(() => {
    setActivePlan(null)
    setIsDemo(false)
    setGate(null)
  }, [])

  const dismissGate = useCallback(() => {
    setGate(null)
  }, [])

  const value = useMemo(
    () => ({
      activePlan,
      isDemo,
      gate,
      canAccess,
      requestFeature,
      requestSubscription,
      startDemo,
      subscribe,
      resetPlan,
      dismissGate,
    }),
    [
      activePlan,
      canAccess,
      dismissGate,
      gate,
      isDemo,
      requestFeature,
      requestSubscription,
      resetPlan,
      startDemo,
      subscribe,
    ],
  )

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
}
