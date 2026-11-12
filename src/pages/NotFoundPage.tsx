import { Link } from 'react-router-dom'

import { CrossLinks } from '@/components/layout/cross-links'
import { BrandLink } from '@/components/layout/site-header'
import { buttonVariants } from '@/components/ui/button'
import { NOT_FOUND_LINKS } from '@/content/navigation'

export default function NotFoundPage() {
  return (
    <main
      id="conteudo"
      className="grid min-h-screen place-items-center bg-background p-6 text-foreground"
    >
      <div className="w-full max-w-lg text-center">
        <BrandLink />

        <p className="text-eyebrow mt-8 text-blue-600 dark:text-blue-400">Erro 404</p>
        <h1 className="text-display mt-3 text-foreground">Página não encontrada</h1>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          O endereço acessado não existe ou foi movido. Use um dos atalhos abaixo para continuar.
        </p>

        <div className="mt-6 flex justify-center">
          <Link to="/" className={buttonVariants({ variant: 'brand', size: 'lg' })}>
            Voltar para o início
          </Link>
        </div>

        <CrossLinks
          className="mt-6 justify-center"
          ariaLabel="Atalhos para outras páginas"
          links={NOT_FOUND_LINKS.filter((link) => link.to !== '/')}
        />
      </div>
    </main>
  )
}
