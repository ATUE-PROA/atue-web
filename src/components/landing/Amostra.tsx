import { useLayoutEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { SEVERITY_STYLES } from '@/components/documents/severity'
import { CountUp, ScaleBar } from '@/components/ui/count-up'
import { Reveal } from '@/components/ui/reveal'
import { SEVERITY_CONTENT } from '@/content/documents'
import { LANDING_PREVIEW, LANDING_SECTIONS } from '@/content/landing'
import { getScoreLevel } from '@/lib/diagnostics'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const MOTION_QUERY = '(prefers-reduced-motion: no-preference)'
const SCALE_TICKS = [0, 25, 50, 75, 100] as const

/**
 * Substitui a seção de depoimentos: a ATUE não tem clientes públicos nem
 * depoimentos reais, então a prova exibida é o artefato que o produto entrega.
 */
export default function Amostra() {
  const gridRef = useRef<HTMLDivElement>(null)
  const level = getScoreLevel(LANDING_PREVIEW.score)

  useLayoutEffect(() => {
    const node = gridRef.current
    if (!node) return

    const cards = Array.from(node.querySelectorAll<HTMLElement>('[data-sample-card]'))
    const media = gsap.matchMedia()

    media.add(MOTION_QUERY, () => {
      gsap.fromTo(
        cards,
        { y: 40 },
        {
          y: 0,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: node,
            start: 'top 88%',
            end: 'top 55%',
            scrub: 0.6,
          },
        },
      )
    })

    return () => media.revert()
  }, [])

  return (
    <section
      id="amostra"
      aria-labelledby="amostra-titulo"
      className="mx-auto w-full max-w-7xl px-6 pb-20"
    >
      <Reveal>
        <h2 id="amostra-titulo" className="max-w-2xl text-section text-foreground">
          {LANDING_SECTIONS.sample.title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {LANDING_SECTIONS.sample.description}
        </p>
      </Reveal>

      <div ref={gridRef} className="mt-10 grid gap-5 lg:grid-cols-12">
        <div data-sample-card className="card-surface p-6 sm:p-8 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-label text-muted-foreground">{LANDING_PREVIEW.scoreCaption}</span>
            <span className="text-xs text-muted-foreground">{LANDING_PREVIEW.dateLabel}</span>
          </div>

          <p className="mt-4 flex items-baseline gap-2">
            <CountUp
              value={LANDING_PREVIEW.score}
              className={cn(
                'text-6xl leading-none font-bold tracking-tight tabular-nums',
                level.textClassName,
              )}
            />
            <span className="text-base text-muted-foreground">de 100</span>
          </p>

          <ScaleBar value={LANDING_PREVIEW.score} className="mt-5" color={level.chartColor} />

          <div
            aria-hidden="true"
            className="mt-1.5 flex justify-between text-xs text-muted-foreground tabular-nums"
          >
            {SCALE_TICKS.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>

          <p className="mt-4 text-sm font-medium text-foreground">
            Classificação · {LANDING_PREVIEW.scoreLabel}
          </p>
          <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {LANDING_PREVIEW.summary}
          </p>

          <p className="mt-5 inline-flex items-start gap-2 rounded-xl border border-border px-3 py-1.5 text-xs leading-snug font-medium text-muted-foreground">
            <span aria-hidden="true" className="mt-1 size-1.5 shrink-0 rounded-full bg-blue-600" />
            {LANDING_PREVIEW.badge} · nenhuma análise real foi executada
          </p>
        </div>

        <ul data-sample-card className="card-surface flex flex-col gap-1 p-6 sm:p-8 lg:col-span-5">
          <li className="text-label pb-3 text-muted-foreground">Pendências encontradas</li>
          {LANDING_PREVIEW.findings.map((finding, index) => (
            <li
              key={finding.title}
              className="flex items-start gap-3 border-t border-border py-3 first-of-type:pt-2"
            >
              <span className="mt-0.5 text-xs text-muted-foreground tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1 text-sm leading-snug text-foreground">
                {finding.title}
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-1.5 rounded-full',
                    SEVERITY_STYLES[finding.severity].dotClassName,
                  )}
                />
                {SEVERITY_CONTENT[finding.severity].label}
              </span>
            </li>
          ))}
          <li className="mt-auto border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
            Cada pendência vem com explicação curta e recomendação prática.
          </li>
        </ul>

        <div
          data-sample-card
          className="card-surface flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-8 lg:col-span-12"
        >
          <div>
            <p className="text-label text-muted-foreground">{LANDING_PREVIEW.nextActionLabel}</p>
            <p className="mt-1.5 max-w-xl text-base font-semibold text-balance text-foreground">
              {LANDING_PREVIEW.nextAction}
            </p>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
            {LANDING_PREVIEW.footnote}
          </p>
        </div>
      </div>

      <Reveal className="mt-8">
        <a
          href="#avaliar"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          Fazer o diagnóstico do meu domínio
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </Reveal>
    </section>
  )
}
