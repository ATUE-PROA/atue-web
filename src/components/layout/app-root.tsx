import { Outlet } from 'react-router-dom'

import { ScrollToTop } from '@/components/layout/scroll-to-top'

export function AppRoot() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  )
}
