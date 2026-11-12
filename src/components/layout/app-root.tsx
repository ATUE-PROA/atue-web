import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { ScrollToTop } from '@/components/layout/scroll-to-top'
import { SkipLink } from '@/components/layout/skip-link'
import { SubscriptionPrompt } from '@/components/plans/SubscriptionPrompt'
import { usePlan } from '@/contexts/plan-context'

const PRODUCT_PATHS = new Set(['/dashboard', '/documents', '/profile', '/settings'])

export function AppRoot() {
  const location = useLocation()
  const { activePlan, dismissGate, requestFeature } = usePlan()
  const previousPathname = useRef(location.pathname)

  useEffect(() => {
    if (previousPathname.current !== location.pathname) {
      previousPathname.current = location.pathname
      dismissGate()
    }
  }, [dismissGate, location.pathname])

  useEffect(() => {
    if (activePlan === null && PRODUCT_PATHS.has(location.pathname)) {
      requestFeature('product-access')
    }
  }, [activePlan, location.pathname, requestFeature])

  return (
    <>
      <SkipLink />
      <ScrollToTop />
      <SubscriptionPrompt />
      <Outlet />
    </>
  )
}
