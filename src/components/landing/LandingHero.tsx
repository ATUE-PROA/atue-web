import { useLayoutEffect, useRef } from 'react'
import { ArrowRight, FileCheck2, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

import { Button } from '@/components/ui/button'
import { LANDING_HERO, LANDING_PREVIEW } from '@/content/landing'

const MOTION_QUERY = '(prefers-reduced-motion: no-preference)'

/** Elemento visual abstrato: pilha de cards do produto em perspectiva, só com CSS. */
function BentoVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute inset-8 -z-10 rounded-full bg-foreground/10 blur-3xl"
      />

      <div className="[perspective:1400px]">
        <div className="group relative mx-auto max-w-md transition-transform duration-500 ease-out lg:[transform:rotateX(10deg)_rotateY(-16deg)_rotateZ(1.5deg)] lg:hover:[transform:rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)]">
          <div className="card-surface p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-label text-muted-foreground">
                {LANDING_PREVIEW.scoreCaption}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-300">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-yellow-500" />
                {LANDING_PREVIEW.scoreLabel}
              </span>
            </div>

            <p className="mt-3 flex items-baseline gap-2">
              <span className="text-5xl font-bold leading-none tracking-tight text-foreground tabular-nums">
                {LANDING_PREVIEW.score}
              </span>
              <span className="text-sm text-muted-foreground">de 100</span>
            </p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div
                aria-hidden="true"
                className="h-full rounded-full bg-foreground"
                style={{ width: `${LANDING_PREVIEW.score}%` }}
              />
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {LANDING_PREVIEW.summary}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="card-surface p-4">
              <ShieldCheck aria-hidden="true" className="size-5 text-blue-600" />
              <p className="mt-3 text-2xl font-semibold text-foreground tabular-nums">3</p>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                pendências priorizadas
              </p>
            </div>

            <div className="card-surface p-4">
              <FileCheck2 aria-hidden="true" className="size-5 text-blue-600" />
              <p className="mt-3 text-sm font-semibold leading-tight text-foreground">
                Relatório pronto
              </p>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                revise antes de enviar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LandingHero() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const media = gsap.matchMedia()

    media.add(MOTION_QUERY, () => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.55 } })

      timeline
        .from('[data-hero="pill"]', { y: 14, opacity: 0 })
        .from('[data-hero="lede"]', { y: 14, opacity: 0 }, '-=0.35')
        .from('[data-hero="actions"]', { y: 14, opacity: 0 }, '-=0.35')
        .from('[data-hero="visual"]', { y: 28, opacity: 0, scale: 0.98, duration: 0.7 }, '-=0.55')

      const safety = window.setTimeout(() => {
        gsap.set('[data-hero]', { opacity: 1, y: 0, scale: 1 })
      }, 1600)

      return () => window.clearTimeout(safety)
    })

    return () => media.revert()
  }, [])

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-7xl px-6 pb-20 pt-14 sm:pt-20">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <p
            data-hero="pill"
            className="text-label inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-blue-600" />
            {LANDING_HERO.eyebrow}
          </p>

          <h1 className="mt-6 text-display text-foreground">{LANDING_HERO.title}</h1>

          <p
            data-hero="lede"
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {LANDING_HERO.description}
          </p>

          <div data-hero="actions" className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="brand" size="xl" className="whitespace-normal">
              <a href={LANDING_HERO.primaryCtaHref}>
                {LANDING_HERO.primaryCtaLabel}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="xl" className="whitespace-normal">
              <a href={LANDING_HERO.secondaryCtaHref}>{LANDING_HERO.secondaryCtaLabel}</a>
            </Button>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Demonstração. Nenhum dado real é analisado.{' '}
            <Link
              to="/privacidade"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Entenda o escopo
            </Link>
            .
          </p>
        </div>

        <div data-hero="visual">
          <BentoVisual />
        </div>
      </div>
    </section>
  )
}
