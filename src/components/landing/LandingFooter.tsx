import { Link } from 'react-router-dom'
import { LANDING_FOOTER } from '@/content/landing'

const linkClasses =
  'text-sm text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-md'

export default function LandingFooter() {
  return (
    <footer
      id="contato"
      className="scroll-mt-16 border-t border-white/10 bg-neutral-950"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-widest text-white uppercase">
              ATUE
            </p>
            <p className="mt-3 max-w-sm text-sm text-neutral-400">
              {LANDING_FOOTER.description}
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              {LANDING_FOOTER.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClasses}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/cadastro" className={linkClasses}>
                  Cadastre-se
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs text-neutral-500">
            {LANDING_FOOTER.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
