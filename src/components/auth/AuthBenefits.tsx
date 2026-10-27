import { BadgeCheck, FolderCheck, ShieldCheck } from 'lucide-react'

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

export function AuthBenefits() {
  return (
    <ul className="mt-8 space-y-4">
      {BENEFITS.map(({ icon: Icon, title, description }) => (
        <li key={title} className="flex items-start gap-3">
          <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-blue-400" />
          <div>
            <p className="text-sm font-medium text-white">{title}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-neutral-400">{description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
