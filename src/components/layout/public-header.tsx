import { useState } from 'react'
import { CreditCard, LayoutDashboard, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

import { BrandLink, SiteHeader } from '@/components/layout/site-header'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
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

  const sessionTarget = activePlan ? '/dashboard' : '/plans'
  const sessionLabel = activePlan ? 'Dashboard' : 'Planos'
  const SessionIcon = activePlan ? LayoutDashboard : CreditCard

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
      <Button asChild variant="brand" size="lg">
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
      <Button asChild variant="brand" size="xl" className="w-full">
        <Link to="/register" onClick={() => setIsMenuOpen(false)}>
          Cadastre-se
        </Link>
      </Button>
    </>
  )

  return (
    <SiteHeader>
      <BrandLink onClick={() => setIsMenuOpen(false)} />

      <nav
        aria-label="Navegação principal"
        className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
      >
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

      <div className="hidden items-center gap-3 lg:flex">
        {authActions}
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-2 lg:hidden">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-muted"
              aria-label="Abrir menu"
            >
              <Menu aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="data-[side=right]:w-4/5 max-w-sm gap-0 p-0">
            <SheetHeader className="border-b border-border p-4 pr-12">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navegação principal e acesso à conta.</SheetDescription>
            </SheetHeader>

            <nav aria-label="Navegação principal móvel" className="flex flex-1 flex-col gap-1 p-4">
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

              <div className="mt-auto flex flex-col gap-2 border-t border-border pt-3">
                {mobileAuthActions}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <ThemeToggle />
      </div>
    </SiteHeader>
  )
}
