import { PhotoFrame } from '@/components/ui/photo'
import { Reveal, Stagger } from '@/components/ui/reveal'
import { LANDING_HOW_IT_WORKS, LANDING_PHOTOS, LANDING_STEPS } from '@/content/landing'

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-16 border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-eyebrow text-blue-600 dark:text-blue-400">
              {LANDING_HOW_IT_WORKS.eyebrow}
            </p>
            <h2 className="mt-4 text-section text-foreground">{LANDING_HOW_IT_WORKS.title}</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              {LANDING_HOW_IT_WORKS.description}
            </p>

            <div className="mt-10">
              <PhotoFrame {...LANDING_PHOTOS.howItWorks} frameClassName="aspect-[4/3]" />
            </div>
          </Reveal>

          <Stagger items="li" stagger={0.1}>
            <ol>
              {LANDING_STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[auto_1fr] gap-6 border-t border-border py-8 first:border-t-0 first:pt-0 sm:gap-10"
                >
                  <span
                    aria-hidden="true"
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 tabular-nums"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Stagger>
        </div>
      </div>
    </section>
  )
}
