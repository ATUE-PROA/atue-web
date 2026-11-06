import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  const previousPathname = useRef(pathname)

  useLayoutEffect(() => {
    const pathChanged = previousPathname.current !== pathname
    previousPathname.current = pathname

    if (hash) {
      const target = document.getElementById(hash.slice(1))
      target?.scrollIntoView({ behavior: 'auto', block: 'start' })
      return
    }

    if (pathname === '/' && !pathChanged) {
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash, key])

  return null
}
