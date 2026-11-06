import { PLANS, PLAN_FEATURES } from '@/content/plans'
import type { PlanFeatureId, PlanId } from '@/types/plans.types'

const PLAN_RANK: Record<PlanId, number> = {
  start: 0,
  growth: 1,
  scale: 2,
}

export function hasPlanAccess(activePlan: PlanId | null, requiredPlan: PlanId): boolean {
  if (!activePlan) {
    return false
  }

  return PLAN_RANK[activePlan] >= PLAN_RANK[requiredPlan]
}

export function getRequiredPlan(featureId: PlanFeatureId): PlanId {
  return PLAN_FEATURES[featureId].requiredPlan
}

export function getPlanName(planId: PlanId): string {
  return PLANS.find((plan) => plan.id === planId)?.name ?? planId
}
