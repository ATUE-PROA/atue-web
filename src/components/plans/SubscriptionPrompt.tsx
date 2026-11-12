import { ArrowRight, Compass } from 'lucide-react'
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
import { useAuth } from '@/contexts/auth-context'
import { usePlan } from '@/contexts/plan-context'
import { getPlanName } from '@/lib/plans'
import { startDemoSession } from '@/services/auth'

export function SubscriptionPrompt() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const { gate, dismissGate, subscribe } = usePlan()

  if (!gate) {
    return null
  }

  const isSubscription = gate.kind === 'subscription'
  const isProductAccess = gate.kind === 'feature' && gate.featureId === 'product-access'
  const planName = getPlanName(
    gate.kind === 'subscription' ? gate.planId : PLAN_FEATURES[gate.featureId].requiredPlan,
  )
  const title = isSubscription
    ? PLAN_GATE_CONTENT.subscription.title.replace('{plan}', planName)
    : isProductAccess
      ? PLAN_GATE_CONTENT.productAccess.title
      : PLAN_GATE_CONTENT.title
  const description = isSubscription
    ? PLAN_GATE_CONTENT.subscription.description.replace('{plan}', planName)
    : isProductAccess
      ? PLAN_GATE_CONTENT.productAccess.description.replace('{plan}', planName)
      : PLAN_GATE_CONTENT.description
          .replace('{feature}', PLAN_FEATURES[gate.featureId].label)
          .replace('{plan}', planName)

  const handleExploreDemo = () => {
    signIn(startDemoSession())
    subscribe('growth')
    navigate('/dashboard')
  }

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
          {isProductAccess ? (
            <>
              <AlertDialogCancel
                onClick={() => {
                  dismissGate()
                  navigate('/plans')
                }}
              >
                {PLAN_GATE_CONTENT.productAccess.plansLabel}
              </AlertDialogCancel>
              <AlertDialogAction variant="brand" onClick={handleExploreDemo}>
                <Compass aria-hidden="true" />
                {PLAN_GATE_CONTENT.productAccess.demoLabel}
              </AlertDialogAction>
            </>
          ) : (
            <>
              <AlertDialogCancel>{PLAN_GATE_CONTENT.secondaryLabel}</AlertDialogCancel>
              {gate.kind === 'subscription' ? (
                <AlertDialogAction
                  variant="brand"
                  onClick={() => {
                    subscribe(gate.planId)
                    navigate('/dashboard')
                  }}
                >
                  {PLAN_GATE_CONTENT.subscription.primaryLabel.replace('{plan}', planName)}
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
                  {PLAN_GATE_CONTENT.primaryLabel}
                  <ArrowRight aria-hidden="true" />
                </AlertDialogAction>
              )}
            </>
          )}
        </AlertDialogFooter>

        {isProductAccess ? (
          <p className="text-xs leading-relaxed text-muted-foreground">
            {PLAN_GATE_CONTENT.productAccess.demoNote}
          </p>
        ) : null}
      </AlertDialogContent>
    </AlertDialog>
  )
}
