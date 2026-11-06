import { useEffect, useRef, useState } from 'react'
import { CreditCard, LayoutDashboard, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

import { BrandLink, SiteHeader } from '@/components/layout/site-header'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui/button'
import { PUBLIC_NAV } from '@/content/navigation'
import { useAuth } from '@/contexts/auth-context'
import { usePlan } from '@/contexts/plan-context'

const linkClasses =
  'rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-blue-400/60'

const mobileLinkClasses =
  'block rounded-md px-2 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 dark:focus-visible:ring-blue-400/60'

export function PublicHeader() {
  const { user } = useAuth()
  const { activePlan } = usePlan()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const sessionTarget = activePlan ? '/dashboard' : '/plans'
  const sessionLabel = activePlan ? 'Dashboard' : 'Planos'
  const SessionIcon = activePlan ? LayoutDashboard : CreditCard

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const authActions = user ? (
    <Button asChild variant="brand" size="lg">
      <Link to={sessionTarget}>
        <SessionIcon aria-hidden="true" />
        {sessionLabel}
      </Link>
    </Button>
  ) : (
    <>
      <Link to="/login" className={linkClasses}>
        Entrar
      </Link>
      <Button asChild variant="inverse" size="lg">
        <Link to="/register">Cadastre-se</Link>
      </Button>
    </>
  )

  const mobileAuthActions = user ? (
    <Button asChild variant="brand" size="xl" className="w-full">
      <Link to={sessionTarget} onClick={() => setIsMenuOpen(false)}>
        <SessionIcon aria-hidden="true" />
        {sessionLabel}
      </Link>
    </Button>
  ) : (
    <>
      <Button asChild variant="outline" size="xl" className="w-full">
        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
          Entrar
        </Link>
      </Button>
      <Button asChild variant="inverse" size="xl" className="w-full">
        <Link to="/register" onClick={() => setIsMenuOpen(false)}>
          Cadastre-se
        </Link>
      </Button>
    </>
  )

  return (
    <SiteHeader
      submenu={
        isMenuOpen ? (
          <div
            id="public-mobile-menu"
            className="border-t border-border bg-background/95 backdrop-blur md:hidden"
          >
            <nav
              aria-label="Navegação principal móvel"
              className="mx-auto w-full max-w-6xl px-6 py-4"
            >
              <ul className="flex flex-col gap-1">
                {PUBLIC_NAV.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={mobileLinkClasses}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                {mobileAuthActions}
              </div>
            </nav>
          </div>
        ) : null
      }
    >
      <BrandLink onClick={() => setIsMenuOpen(false)} />

      <nav aria-label="Navegação principal" className="hidden md:block">
        <ul className="flex items-center gap-6">
          {PUBLIC_NAV.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className={linkClasses}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden items-center gap-3 md:flex">
        {authActions}
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <Button
          ref={menuButtonRef}
          type="button"
          variant="ghost"
          size="icon"
          className="text-foreground hover:bg-muted"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="public-mobile-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
        <ThemeToggle />
      </div>
    </SiteHeader>
  )
}
