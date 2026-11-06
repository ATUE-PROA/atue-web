import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  const previousPathname = useRef(pathname)
  const hasMounted = useRef(false)

  useLayoutEffect(() => {
    const pathChanged = previousPathname.current !== pathname
    previousPathname.current = pathname

    if (hash) {
      const target = document.getElementById(hash.slice(1))
      target?.scrollIntoView({ behavior: 'auto', block: 'start' })
      hasMounted.current = true
      return
    }

    if (!hasMounted.current && !pathChanged) {
      hasMounted.current = true
      return
    }

    hasMounted.current = true
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash, key])

  return null
}
