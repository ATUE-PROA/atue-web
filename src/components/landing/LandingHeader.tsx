import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { LandingNavItem } from '@/types/landing.types'

const NAV_ITEMS: readonly LandingNavItem[] = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

const linkClasses =
  'rounded-md text-sm text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950'

export default function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          to="/"
          className="rounded-md text-lg font-semibold tracking-widest text-white uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
        >
          ATUE
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClasses}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/cadastro" className={linkClasses}>
            Login
          </Link>
          <Button
            asChild
            className="rounded-full bg-white px-5 text-neutral-950 hover:bg-neutral-200"
          >
            <Link to="/cadastro">Cadastre-se</Link>
          </Button>
        </div>

        <Button
          ref={menuButtonRef}
          type="button"
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 md:hidden"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-neutral-950/95 backdrop-blur md:hidden"
        >
          <nav aria-label="Navegação principal móvel" className="mx-auto w-full max-w-6xl px-6 py-4">
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-md px-2 py-3 text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/cadastro"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-md px-2 py-3 text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
                >
                  Login
                </Link>
              </li>
            </ul>
            <Button
              asChild
              className="mt-2 w-full rounded-full bg-white text-neutral-950 hover:bg-neutral-200"
            >
              <Link to="/cadastro" onClick={() => setIsMenuOpen(false)}>
                Cadastre-se
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
