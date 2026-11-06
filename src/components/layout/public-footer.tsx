import { Link } from 'react-router-dom'

import { BrandLink } from '@/components/layout/site-header'
import { PUBLIC_FOOTER_CONTENT } from '@/content/footer'
import { PUBLIC_FOOTER_LINKS } from '@/content/navigation'

const linkClasses =
  'rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-blue-400/60'

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <BrandLink />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {PUBLIC_FOOTER_CONTENT.description}
            </p>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
              {PUBLIC_FOOTER_CONTENT.notice}
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
              {PUBLIC_FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">{PUBLIC_FOOTER_CONTENT.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
