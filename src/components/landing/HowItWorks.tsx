import { BadgeCheck, FolderCheck, SearchCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { LANDING_STEPS } from '@/content/landing'

const STEP_ICONS: readonly LucideIcon[] = [SearchCheck, FolderCheck, BadgeCheck] as const

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="mx-auto w-full max-w-6xl scroll-mt-16 px-6 py-16 sm:py-20 lg:py-24"
    >
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Como funciona?
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {LANDING_STEPS.map((step, index) => {
          const Icon = STEP_ICONS[index]

          return (
            <article key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <Icon aria-hidden="true" className="size-6 text-blue-400" />
              <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{step.description}</p>
            </article>
          )
        })}

        <div
          aria-hidden="true"
          className="relative flex min-h-56 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6"
        >
          <div className="absolute inset-x-6 top-8 h-24 rounded-full bg-blue-500/20 blur-2xl" />
          <div className="relative w-full max-w-48">
            <div className="mx-auto h-2.5 w-16 rounded-t-md border border-b-0 border-white/10 bg-neutral-800" />
            <div className="rounded-md border border-white/15 bg-neutral-900 p-2 shadow-2xl">
              <div className="h-20 rounded-sm border border-white/10 bg-gradient-to-br from-blue-500/20 via-neutral-900 to-neutral-950 p-2">
                <div className="h-1.5 w-2/3 rounded-full bg-blue-400/50" />
                <div className="mt-2 h-1.5 w-1/2 rounded-full bg-white/15" />
                <div className="mt-4 grid grid-cols-3 gap-1">
                  <span className="h-5 rounded-sm bg-white/10" />
                  <span className="h-5 rounded-sm bg-white/10" />
                  <span className="h-5 rounded-sm bg-white/10" />
                </div>
              </div>
            </div>
            <div className="mx-auto mt-1 h-1.5 w-24 rounded-b-md border border-t-0 border-white/10 bg-neutral-800" />
          </div>
        </div>
      </div>
    </section>
  )
}
