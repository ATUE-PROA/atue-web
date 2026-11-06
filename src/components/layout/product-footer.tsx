import { Link } from 'react-router-dom'

import { PRODUCT_FOOTER_LINKS } from '@/content/navigation'

const linkClasses =
  'rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-blue-400/60'

export function ProductFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted-foreground">
          ATUE · Ambiente de demonstração. Nenhum dado é persistido.
        </p>

        <nav aria-label="Navegação do rodapé da área logada">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {PRODUCT_FOOTER_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClasses}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
