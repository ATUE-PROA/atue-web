import { Link } from 'react-router-dom'
import { BrandLink } from '@/components/layout/site-header'
import { PUBLIC_NAV } from '@/content/navigation'

const footerLinkClasses =
  'rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-blue-400/60'

interface PublicFooterProps {
  description: string
  copyright: string
}

export function PublicFooter({ description, copyright }: PublicFooterProps) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <BrandLink />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">{description}</p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {PUBLIC_NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={footerLinkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/register" className={footerLinkClasses}>
                  Cadastre-se
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
