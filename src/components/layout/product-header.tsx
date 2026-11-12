import { useState } from 'react'
import {
  CreditCard,
  Files,
  LayoutDashboard,
  Menu,
  Settings,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import { BrandLink, SiteHeader } from '@/components/layout/site-header'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { PLAN_GATE_CONTENT } from '@/content/plans'
import { usePlan } from '@/contexts/plan-context'
import { getPlanName } from '@/lib/plans'
import { cn } from '@/lib/utils'

const navLinkClasses =
  'inline-flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-blue-400/60'

interface ProductNavItem {
  to: string
  label: string
  icon: LucideIcon
}

const PRODUCT_NAV: readonly ProductNavItem[] = [
  { to: '/dashboard', label: 'Painel', icon: LayoutDashboard },
  { to: '/documents', label: 'Documentos', icon: Files },
  { to: '/profile', label: 'Perfil', icon: UserRound },
  { to: '/settings', label: 'Configurações', icon: Settings },
] as const

const MOBILE_LINK_CLASSES =
  'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60'

function getNavLinkClassName({ isActive }: { isActive: boolean }): string {
  return cn(
    navLinkClasses,
    isActive
      ? 'bg-muted text-foreground'
      : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground',
  )
}

export function ProductHeader() {
  const { activePlan } = usePlan()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const planLabel = activePlan ? getPlanName(activePlan) : PLAN_GATE_CONTENT.noPlanLabel

  return (
    <SiteHeader>
      <BrandLink to="/dashboard" />

      <div className="hidden items-center gap-1 lg:flex">
        <Badge
          asChild
          variant="outline"
          className="mr-1 h-auto rounded-full px-2.5 py-1 text-muted-foreground hover:bg-muted hover:text-foreground [a]:hover:text-foreground"
        >
          <Link to="/plans" aria-label={`Plano atual: ${planLabel}. Ver planos`}>
            <CreditCard aria-hidden="true" />
            <span>{planLabel}</span>
          </Link>
        </Badge>

        <nav aria-label="Navegação da conta" className="flex items-center gap-1">
          {PRODUCT_NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              aria-label={
                label === 'Documentos'
                  ? 'Central de Documentos'
                  : label === 'Painel'
                    ? 'Painel de controle'
                    : label === 'Perfil'
                      ? 'Perfil da conta'
                      : 'Configurações da conta'
              }
              className={getNavLinkClassName}
              end
            >
              <Icon aria-hidden="true" className="size-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <ThemeToggle />
      </div>

      <div className="flex items-center gap-1 lg:hidden">
        <ThemeToggle />

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-lg"
              className="text-foreground hover:bg-muted"
              aria-label="Abrir menu da conta"
            >
              <Menu aria-hidden="true" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="data-[side=right]:w-4/5 max-w-sm gap-0 p-0">
            <SheetHeader className="border-b border-border p-4 pr-12">
              <SheetTitle>Menu da conta</SheetTitle>
              <SheetDescription>Navegação da área logada e plano atual.</SheetDescription>
            </SheetHeader>

            <nav aria-label="Navegação da conta móvel" className="flex flex-1 flex-col gap-1 p-4">
              <ul className="flex flex-col gap-1">
                {PRODUCT_NAV.map(({ to, label, icon: Icon }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(MOBILE_LINK_CLASSES, isActive && 'bg-muted text-foreground')
                      }
                    >
                      <Icon aria-hidden="true" className="size-4" />
                      {label === 'Documentos' ? 'Central de Documentos' : label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-auto border-t border-border pt-3">
                <Link
                  to="/plans"
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(MOBILE_LINK_CLASSES, 'justify-between')}
                >
                  <span className="flex items-center gap-3">
                    <CreditCard aria-hidden="true" className="size-4" />
                    Plano atual
                  </span>
                  <span className="text-xs font-normal text-muted-foreground">{planLabel}</span>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </SiteHeader>
  )
}
