import { CheckCircle2 } from 'lucide-react'
import { LANDING_VISION } from '@/content/landing'

export default function BuildSection() {
  return (
    <section id="sobre" className="scroll-mt-16 border-t border-white/10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {LANDING_VISION.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-400">
            {LANDING_VISION.description}
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {LANDING_VISION.commitments.map((commitment) => (
            <li
              key={commitment}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-blue-400" />
              <span className="text-sm text-neutral-200">{commitment}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
