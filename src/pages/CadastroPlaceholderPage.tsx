import { Link, useLocation } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { readDomainState } from '@/lib/domain'
import { cn } from '@/lib/utils'

export default function CadastroPlaceholderPage() {
  const location = useLocation()
  const domain = readDomainState(location.state)

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Cadastro em construção
        </h1>
        {domain ? (
          <p className="mt-4 text-muted-foreground">
            Recebemos o domínio {domain}. O fluxo de cadastro será implementado
            na próxima etapa.
          </p>
        ) : (
          <p className="mt-4 text-muted-foreground">
            O fluxo de cadastro será implementado na próxima etapa.
          </p>
        )}
        <Link
          to="/"
          className={cn(buttonVariants({ variant: 'outline' }), 'mt-6')}
        >
          Voltar para a landing
        </Link>
      </div>
    </main>
  )
}
