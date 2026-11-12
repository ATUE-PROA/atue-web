import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

import ProductPreview from '@/components/landing/ProductPreview'
import { Button } from '@/components/ui/button'
import { PhotoFrame } from '@/components/ui/photo'
import { LANDING_HERO, LANDING_PHOTOS } from '@/content/landing'

const MOTION_QUERY = '(prefers-reduced-motion: no-preference)'

export default function LandingHero() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const media = gsap.matchMedia()
    media.add(
      MOTION_QUERY,
      () => {
        const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

        timeline
          .fromTo(
            '[data-hero-item]',
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.09 },
          )
          // O artefato de produto nunca começa invisível: apenas desliza para o lugar.
          .fromTo('[data-hero-card]', { y: 32 }, { y: 0, duration: 0.8 }, '-=0.5')
          .fromTo(
            '[data-hero-photo]',
            { y: 40, opacity: 0, scale: 0.985 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
            '-=0.45',
          )

        gsap.fromTo(
          '[data-hero-photo] img',
          { yPercent: -3, scale: 1.1 },
          {
            yPercent: 3,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-hero-photo]',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        )

        // Se a timeline não rodar (aba em segundo plano, falha de ticker), a
        // primeira dobra não pode continuar invisível.
        const safety = window.setTimeout(() => {
          gsap.set('[data-hero-item]', { opacity: 1, y: 0 })
        }, 1500)

        return () => window.clearTimeout(safety)
      },
      node,
    )

    return () => media.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl px-6 pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-16">
        <div>
          <p data-hero-item className="text-eyebrow text-blue-600 dark:text-blue-400">
            {LANDING_HERO.eyebrow}
          </p>
          <h1 data-hero-item className="mt-4 text-display text-foreground">
            {LANDING_HERO.title}
          </h1>
          <p data-hero-item className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {LANDING_HERO.description}
          </p>

          <div data-hero-item className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="brand" size="xl" className="h-auto min-h-11 whitespace-normal">
              <a href={LANDING_HERO.primaryCtaHref}>{LANDING_HERO.primaryCtaLabel}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="h-auto min-h-11 whitespace-normal"
            >
              <a href={LANDING_HERO.secondaryCtaHref}>{LANDING_HERO.secondaryCtaLabel}</a>
            </Button>
          </div>
        </div>

        <ProductPreview />
      </div>

      <div data-hero-photo className="mt-12 overflow-hidden rounded-2xl sm:mt-16">
        <PhotoFrame
          {...LANDING_PHOTOS.hero}
          priority
          frameClassName="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1]"
        />
      </div>
    </section>
  )
}
