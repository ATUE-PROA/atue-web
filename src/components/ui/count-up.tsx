import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MOTION_QUERY = '(prefers-reduced-motion: no-preference)'

interface CountUpProps {
  value: number
  className?: string
  /** Duração em segundos. */
  duration?: number
}

/** Número que conta até o valor quando entra na tela. Estático em reduced-motion. */
export function CountUp({ value, className, duration = 0.9 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    node.textContent = String(value)
    const media = gsap.matchMedia()

    media.add(MOTION_QUERY, () => {
      const counter = { current: 0 }
      node.textContent = '0'

      gsap.to(counter, {
        current: value,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          node.textContent = String(Math.round(counter.current))
        },
        scrollTrigger: { trigger: node, start: 'top 92%', once: true },
      })
    })

    const safety = window.setTimeout(() => {
      if (node.dataset.done !== 'true' && node.textContent === '0') {
        node.textContent = String(value)
      }
    }, 1600)

    node.dataset.done = 'true'

    return () => {
      window.clearTimeout(safety)
      media.revert()
    }
  }, [value, duration])

  return <span ref={ref} className={className} />
}

interface ScaleBarProps {
  value: number
  className?: string
  /** Cor da barra; padrão é a tinta do texto. */
  color?: string
}

/** Barra proporcional de 0 a 100, desenhada uma vez. */
export function ScaleBar({ value, className, color }: ScaleBarProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    const media = gsap.matchMedia()

    media.add(MOTION_QUERY, () => {
      gsap.fromTo(
        node,
        { scaleX: 0 },
        {
          scaleX: Math.min(1, Math.max(0, value / 100)),
          duration: 0.9,
          ease: 'power2.out',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: node, start: 'top 92%', once: true },
        },
      )
    })

    return () => media.revert()
  }, [value])

  return (
    <div className={className}>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          ref={ref}
          aria-hidden="true"
          className="h-full origin-left rounded-full bg-foreground"
          style={{
            width: `${Math.min(100, Math.max(0, value))}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}
