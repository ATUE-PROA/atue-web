import { BarChart3, CheckCircle2, FileText, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { LANDING_VISION } from '@/content/landing'

const COMMITMENT_ICONS: readonly LucideIcon[] = [
  ShieldCheck,
  BarChart3,
  FileText,
  CheckCircle2,
] as const

export default function BuildSection() {
  return (
    <section id="sobre" className="scroll-mt-16 border-t border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {LANDING_VISION.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {LANDING_VISION.description}
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {LANDING_VISION.commitments.map((commitment, index) => {
            const Icon = COMMITMENT_ICONS[index]

            return (
              <li
                key={commitment}
                className="flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50/50 p-4 dark:border-border dark:bg-card"
              >
                <Icon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-blue-600 dark:text-blue-400"
                />
                <span className="text-sm text-foreground">{commitment}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
