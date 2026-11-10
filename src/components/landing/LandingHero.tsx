import { Button } from '@/components/ui/button'
import { LANDING_HERO } from '@/content/landing'

export default function LandingHero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
            {LANDING_HERO.eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
            {LANDING_HERO.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {LANDING_HERO.description}
          </p>
          <div className="mt-8">
            <Button asChild variant="brand" size="lg" className="rounded-full">
              <a href={LANDING_HERO.ctaHref}>{LANDING_HERO.ctaLabel}</a>
            </Button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-blue-300/60 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-8 sm:min-h-[400px] dark:border-white/10 dark:from-neutral-900 dark:via-neutral-950 dark:to-black"
        >
          <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-white/20 blur-3xl dark:bg-blue-500/20" />
          <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-sky-300/30 blur-3xl dark:bg-indigo-500/10" />

          <div className="relative h-52 w-40 rotate-[-8deg] rounded-xl border border-white/40 bg-white/25 shadow-xl backdrop-blur-sm sm:h-64 sm:w-52 dark:border-white/10 dark:bg-neutral-700/40" />
          <div className="relative z-10 -ml-12 h-64 w-44 rotate-[6deg] overflow-hidden rounded-xl border border-white/30 bg-neutral-900 shadow-2xl sm:h-72 sm:w-56">
            <div className="grid grid-cols-4 gap-1.5 p-3">
              {Array.from({ length: 24 }).map((_, index) => (
                <span key={index} className="h-1.5 rounded-full bg-white/15" />
              ))}
            </div>
            <div className="mx-3 mt-4 space-y-2">
              <div className="h-2 w-3/4 rounded-full bg-blue-400" />
              <div className="h-2 w-1/2 rounded-full bg-white/15" />
              <div className="h-2 w-2/3 rounded-full bg-white/15" />
            </div>
            <div className="mx-3 mt-6 h-16 rounded-md bg-gradient-to-br from-blue-500 to-blue-600" />
          </div>

          <div className="absolute bottom-6 left-6 h-24 w-32 rotate-[-16deg] rounded-lg border border-white/40 bg-white/25 backdrop-blur-sm dark:border-white/10 dark:bg-neutral-700/40" />
        </div>
      </div>
    </section>
  )
}
