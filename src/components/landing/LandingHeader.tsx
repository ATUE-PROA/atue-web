import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { BrandLink, SiteHeader } from '@/components/layout/site-header'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui/button'
import { LANDING_NAV } from '@/content/landing'

const linkClasses =
  'rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-blue-400/60'

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
    <SiteHeader
      submenu={
        isMenuOpen ? (
          <div
            id="mobile-menu"
            className="border-t border-border bg-background/95 backdrop-blur md:hidden"
          >
            <nav
              aria-label="Navegação principal móvel"
              className="mx-auto w-full max-w-6xl px-6 py-4"
            >
              <ul className="flex flex-col gap-1">
                {LANDING_NAV.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded-md px-2 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 dark:focus-visible:ring-blue-400/60"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    to="/plans"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-md px-2 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 dark:focus-visible:ring-blue-400/60"
                  >
                    Planos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/form"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-md px-2 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 dark:focus-visible:ring-blue-400/60"
                  >
                    Enviar documentos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-md px-2 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 dark:focus-visible:ring-blue-400/60"
                  >
                    Login
                  </Link>
                </li>
              </ul>
              <Button
                asChild
                className="mt-2 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  Cadastre-se
                </Link>
              </Button>
            </nav>
          </div>
        ) : null
      }
    >
      <BrandLink onClick={() => setIsMenuOpen(false)} />

      <nav aria-label="Navegação principal" className="hidden md:block">
        <ul className="flex items-center gap-6">
          {LANDING_NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={linkClasses}>
                {item.label}
              </a>
            </li>
          ))}
          <li className="hidden lg:block">
            <Link to="/plans" className={linkClasses}>
              Planos
            </Link>
          </li>
          <li className="hidden lg:block">
            <Link to="/form" className={linkClasses}>
              Enviar documentos
            </Link>
          </li>
        </ul>
      </nav>

      <div className="hidden items-center gap-3 md:flex">
        <Link to="/login" className={linkClasses}>
          Login
        </Link>
        <Button
          asChild
          className="rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90"
        >
          <Link to="/register">Cadastre-se</Link>
        </Button>
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <Button
          ref={menuButtonRef}
          type="button"
          variant="ghost"
          size="icon"
          className="text-foreground hover:bg-muted"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
        <ThemeToggle />
      </div>
    </SiteHeader>
  )
}
