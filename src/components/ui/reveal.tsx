import { useLayoutEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

const MOTION_QUERY = '(prefers-reduced-motion: no-preference)'
const SAFETY_DELAY_MS = 1200

function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect()

  return rect.top < window.innerHeight && rect.bottom > 0
}

interface RevealProps {
  children: ReactNode
  className?: string
  /** Atraso em segundos, como no GSAP. */
  delay?: number
}

/** Entrada discreta do bloco ao entrar na tela. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    const media = gsap.matchMedia()

    media.add(MOTION_QUERY, () => {
      gsap.fromTo(
        node,
        { y: 28 },
        {
          y: 0,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: node, start: 'top 88%', once: true },
        },
      )
    })

    // Se o ScrollTrigger não disparar (âncora, aba em segundo plano, falha de
    // medição), o conteúdo visível não pode continuar invisível.
    const safety = window.setTimeout(() => {
      if (isInViewport(node)) {
        gsap.set(node, { y: 0 })
      }
    }, SAFETY_DELAY_MS)

    ScrollTrigger.refresh()

    return () => {
      window.clearTimeout(safety)
      media.revert()
    }
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  /** Seletor CSS dos itens animados dentro do grupo. */
  items: string
  /** Atraso em segundos, como no GSAP. */
  delay?: number
  stagger?: number
}

/** Entrada em cascata para listas e grades curtas. */
export function Stagger({ children, className, items, delay = 0, stagger = 0.09 }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return

    const targets = Array.from(node.querySelectorAll<HTMLElement>(items))
    if (targets.length === 0) return

    const media = gsap.matchMedia()

    media.add(MOTION_QUERY, () => {
      gsap.fromTo(
        targets,
        { y: 22 },
        {
          y: 0,
          duration: 0.65,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: { trigger: node, start: 'top 85%', once: true },
        },
      )
    })

    const safety = window.setTimeout(() => {
      targets.forEach((target) => {
        if (isInViewport(target)) {
          gsap.set(target, { y: 0 })
        }
      })
    }, SAFETY_DELAY_MS)

    ScrollTrigger.refresh()

    return () => {
      window.clearTimeout(safety)
      media.revert()
    }
  }, [delay, items, stagger])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
