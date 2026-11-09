import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { PLAN_FEATURES, PLAN_GATE_CONTENT } from '@/content/plans'
import { usePlan } from '@/contexts/plan-context'
import { getPlanName } from '@/lib/plans'

export function SubscriptionPrompt() {
  const navigate = useNavigate()
  const { gate, dismissGate, subscribe } = usePlan()

  if (!gate) {
    return null
  }

  const isSubscription = gate.kind === 'subscription'
  const planName = getPlanName(
    gate.kind === 'subscription' ? gate.planId : PLAN_FEATURES[gate.featureId].requiredPlan,
  )
  const title = isSubscription
    ? PLAN_GATE_CONTENT.subscription.title.replace('{plan}', planName)
    : gate.featureId === 'product-access'
      ? 'Assine um plano para entrar na área logada'
      : PLAN_GATE_CONTENT.title
  const description = isSubscription
    ? PLAN_GATE_CONTENT.subscription.description.replace('{plan}', planName)
    : PLAN_GATE_CONTENT.description
        .replace('{feature}', PLAN_FEATURES[gate.featureId].label)
        .replace('{plan}', planName)
  const primaryLabel = isSubscription
    ? PLAN_GATE_CONTENT.subscription.primaryLabel.replace('{plan}', planName)
    : PLAN_GATE_CONTENT.primaryLabel

  return (
    <AlertDialog
      open
      onOpenChange={(open) => {
        if (!open) {
          dismissGate()
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{PLAN_GATE_CONTENT.secondaryLabel}</AlertDialogCancel>

          {gate.kind === 'subscription' ? (
            <AlertDialogAction
              variant="brand"
              onClick={() => {
                subscribe(gate.planId)
                navigate('/dashboard')
              }}
            >
              {primaryLabel}
              <ArrowRight aria-hidden="true" />
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              variant="brand"
              onClick={() => {
                dismissGate()
                navigate('/plans')
              }}
            >
              {primaryLabel}
              <ArrowRight aria-hidden="true" />
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
