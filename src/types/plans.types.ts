export type PlanId = 'start' | 'growth' | 'scale'

export type PlanFeatureId = 'product-access' | 'detailed-reports' | 'integrations'

export interface PlanFeatureDefinition {
  label: string
  description: string
  requiredPlan: PlanId
}

export type PlanGateRequest =
  { kind: 'feature'; featureId: PlanFeatureId } | { kind: 'subscription'; planId: PlanId }

export interface PlanDefinition {
  id: PlanId
  name: string
  badge: string
  recommended: boolean
  description: string
  price: string
  priceSuffix: string
  inherits: string | null
  features: readonly string[]
  ctaLabel: string
  href: string
  note: string
}
