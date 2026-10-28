import { FileText, Lock, ShieldCheck, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { LANDING_FEATURES } from '@/content/landing'

const FEATURE_ICONS: readonly LucideIcon[] = [ShieldCheck, FileText, Lock, Sparkles] as const

export default function FeatureStrip() {
  return (
    <section id="beneficios" className="scroll-mt-16 border-y border-white/10 bg-neutral-950">
      <h2 className="sr-only">Benefícios</h2>
      <ul className="mx-auto grid w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {LANDING_FEATURES.map((feature, index) => {
          const Icon = FEATURE_ICONS[index]

          return (
            <li
              key={feature.title}
              className="border-b border-white/10 p-8 last:border-b-0 sm:[&:nth-child(n+3)]:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-r lg:border-b-0 lg:last:border-r-0"
            >
              <Icon aria-hidden="true" className="size-6 text-blue-400" />
              <h3 className="mt-5 text-base font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{feature.description}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
