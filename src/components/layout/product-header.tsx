import { CreditCard, Files, LayoutDashboard, Settings, UserRound } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import { BrandLink, SiteHeader } from '@/components/layout/site-header'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { PLAN_GATE_CONTENT } from '@/content/plans'
import { usePlan } from '@/contexts/plan-context'
import { getPlanName } from '@/lib/plans'
import { cn } from '@/lib/utils'

const navLinkClasses =
  'inline-flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-blue-400/60'

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
  const planLabel = activePlan ? getPlanName(activePlan) : PLAN_GATE_CONTENT.noPlanLabel

  return (
    <SiteHeader>
      <BrandLink to="/dashboard" />
      <nav aria-label="Navegação da conta" className="flex items-center gap-1">
        <Badge
          asChild
          variant="outline"
          className="mr-1 h-auto rounded-full px-2.5 py-1 text-muted-foreground hover:bg-muted hover:text-foreground [a]:hover:text-foreground"
        >
          <Link to="/plans" aria-label={`Plano atual: ${planLabel}. Ver planos`}>
            <CreditCard aria-hidden="true" />
            <span className="hidden md:inline">{planLabel}</span>
          </Link>
        </Badge>

        <NavLink
          to="/dashboard"
          aria-label="Painel de controle"
          className={getNavLinkClassName}
          end
        >
          <LayoutDashboard aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">Painel</span>
        </NavLink>

        <NavLink
          to="/documents"
          aria-label="Central de Documentos"
          className={getNavLinkClassName}
          end
        >
          <Files aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">Documentos</span>
        </NavLink>

        <NavLink to="/profile" aria-label="Perfil da conta" className={getNavLinkClassName} end>
          <UserRound aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">Perfil</span>
        </NavLink>

        <NavLink
          to="/settings"
          aria-label="Configurações da conta"
          className={getNavLinkClassName}
          end
        >
          <Settings aria-hidden="true" className="size-4" />
          <span className="hidden sm:inline">Configurações</span>
        </NavLink>

        <ThemeToggle />
      </nav>
    </SiteHeader>
  )
}
