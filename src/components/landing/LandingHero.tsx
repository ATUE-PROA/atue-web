import { Button } from '@/components/ui/button'

export default function LandingHero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-blue-400 uppercase">
            Conformidade digital
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            É possível obter um contrato mesmo após conquistar o cliente.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
            Veja os riscos e oportunidades e evite problemas de conformidade.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white px-6 font-medium text-neutral-950 hover:bg-neutral-200"
            >
              <a href="#capturar-dominio">Conheça o ATUE</a>
            </Button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-8 sm:min-h-[400px]"
        >
          <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative h-52 w-40 rotate-[-8deg] rounded-lg border border-white/10 bg-gradient-to-b from-neutral-700/70 to-neutral-900 shadow-2xl sm:h-64 sm:w-52" />
          <div className="relative z-10 -ml-12 h-64 w-44 rotate-[6deg] rounded-lg border border-white/15 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 shadow-2xl sm:h-72 sm:w-56">
            <div className="grid grid-cols-4 gap-1.5 p-3">
              {Array.from({ length: 24 }).map((_, index) => (
                <span
                  key={index}
                  className="h-1.5 rounded-full bg-white/10"
                />
              ))}
            </div>
            <div className="mx-3 mt-4 space-y-2">
              <div className="h-2 w-3/4 rounded-full bg-blue-400/40" />
              <div className="h-2 w-1/2 rounded-full bg-white/10" />
              <div className="h-2 w-2/3 rounded-full bg-white/10" />
            </div>
            <div className="mx-3 mt-6 h-16 rounded-md border border-white/10 bg-gradient-to-br from-blue-500/20 to-transparent" />
          </div>

          <div className="absolute bottom-6 left-6 h-24 w-32 rotate-[-16deg] rounded-md border border-white/10 bg-gradient-to-t from-neutral-900 to-neutral-800/60 blur-[1px]" />
        </div>
      </div>
    </section>
  )
}
