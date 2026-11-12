import { BadgeCheck, FolderCheck, ShieldCheck } from 'lucide-react'

import { cn } from '@/lib/utils'

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Centralize evidências',
    description: 'Mantenha políticas, registros e comprovações em um só lugar.',
  },
  {
    icon: FolderCheck,
    title: 'Acompanhe pendências',
    description: 'Veja o que falta para organizar sua conformidade.',
  },
  {
    icon: BadgeCheck,
    title: 'Compartilhe com confiança',
    description: 'Apresente resultados com clareza para clientes e parceiros.',
  },
]

interface AuthBenefitsProps {
  /** No login, o benefício precisa caber acima do formulário no celular. */
  compact?: boolean
}

export function AuthBenefits({ compact = false }: AuthBenefitsProps) {
  return (
    <ul className="mt-8 space-y-4">
      {BENEFITS.map(({ icon: Icon, title, description }) => (
        <li key={title} className="flex items-start gap-3">
          <Icon
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-blue-600 dark:text-blue-400"
          />
          <div>
            <p className="text-sm font-medium text-foreground">{title}</p>
            <p
              className={cn(
                'mt-0.5 text-sm leading-relaxed text-muted-foreground',
                compact && 'hidden sm:block',
              )}
            >
              {description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
