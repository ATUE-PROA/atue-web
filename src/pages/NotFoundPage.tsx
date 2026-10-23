import { Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Página não encontrada
        </h1>
        <p className="mt-2 text-muted-foreground">
          O endereço acessado não existe ou foi movido.
        </p>
        <Link to="/" className={buttonVariants({ variant: 'outline' }) + ' mt-6'}>
          Voltar para o início
        </Link>
      </div>
    </main>
  )
}
