import { useLayoutEffect, useRef } from 'react'
import { Building2, Eye, FileCheck, FileText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import gsap from 'gsap'

import { Photo } from '@/components/ui/photo'
import { Reveal } from '@/components/ui/reveal'
import { LANDING_PHOTOS, LANDING_VISION } from '@/content/landing'

const MOTION_QUERY = '(prefers-reduced-motion: no-preference)'

const COMMITMENT_ICONS: readonly LucideIcon[] = [Building2, Eye, FileCheck, FileText] as const

export default function BuildSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const node = sectionRef.current
    const photo = node?.querySelector('img')
    if (!node || !photo) return

    const media = gsap.matchMedia()
    media.add(MOTION_QUERY, () => {
      gsap.fromTo(
        photo,
        { yPercent: -4, scale: 1.14 },
        {
          yPercent: 4,
          scale: 1.14,
          ease: 'none',
          scrollTrigger: { trigger: node, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        },
      )
    })

    return () => media.revert()
  }, [])

  return (
    <section ref={sectionRef} id="sobre" className="relative isolate scroll-mt-16 overflow-hidden">
      <Photo {...LANDING_PHOTOS.vision} className="absolute inset-0 -z-20" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/60 sm:bg-transparent sm:bg-gradient-to-r sm:from-black/85 sm:via-black/65 sm:to-black/30"
      />

      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-eyebrow text-blue-300">{LANDING_VISION.eyebrow}</p>
          <h2 className="mt-4 text-section text-balance text-white">{LANDING_VISION.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">{LANDING_VISION.description}</p>

          <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {LANDING_VISION.commitments.map((commitment, index) => {
              const Icon = COMMITMENT_ICONS[index]

              return (
                <li
                  key={commitment}
                  className="flex items-start gap-3 border-t border-white/20 pt-4"
                >
                  <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-blue-300" />
                  <span className="text-sm leading-relaxed text-white/90">{commitment}</span>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
